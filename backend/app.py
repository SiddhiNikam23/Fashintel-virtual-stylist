from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gtts import gTTS
import cv2
import mediapipe as mp
import numpy as np
import os
import uuid
import base64
from PIL import Image
import io
import shutil
import json
from gradio_client import Client, handle_file

# ----------------------------
# Flask App Setup
# ----------------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "tryon_outputs")
STATIC_IMG_FOLDER = os.path.join(BASE_DIR, "static", "img")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)
os.makedirs(STATIC_IMG_FOLDER, exist_ok=True)


HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")

mp_face = mp.solutions.face_mesh
mp_pose = mp.solutions.pose

# ----------------------------
# Serve Static Files
# ----------------------------
@app.route('/static/img/<filename>')
def static_images(filename):
    return send_file(os.path.join(STATIC_IMG_FOLDER, filename))

#@app.route('/favicon.ico')
#def favicon():
#   return send_file(os.path.join('static', 'favicon.ico'))

@app.route('/uploads/<path:filename>')
def get_upload(filename):
    """Serve uploaded user or dress images."""
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path)
    return jsonify({"error": f"File not found: {filename}"}), 404

@app.route('/tryon_outputs/<path:filename>')
def get_tryon_output(filename):
    """Serve generated try-on output images."""
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path)
    return jsonify({"error": f"File not found: {filename}"}), 404

# ----------------------------
# Home / Health Check
# ----------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "service": "Fashiontel AI Backend",
        "version": "3.0.0",
        "endpoints": {
            "skin_analysis": "/analyze",
            "garment_detection": "/api/fashion/detect-garment",
            "virtual_tryon": "/api/fashion/tryon",
            "tryon_upper": "/api/fashion/tryon/upper",
            "tryon_lower": "/api/fashion/tryon/lower",
            "tryon_full": "/api/fashion/tryon/full",
            "body_reco": "/api/body-reco",
            "dresses": "/api/dresses"
        }
    })

@app.route("/api/fashion/health", methods=["GET"])
def tryon_health():
    try:
        import gradio_client
        ai_available = True
    except ImportError:
        ai_available = False

    return jsonify({
        'status': 'healthy',
        'ai_enabled': ai_available,
        'message': 'Ready!' if ai_available else 'Install: pip install gradio_client'
    }), 200

# ----------------------------
# Products / Dresses
# ----------------------------
@app.route('/api/dresses', methods=['GET'])
def get_dresses():
    with open('dresses.json') as f:
        dresses = json.load(f)
    return jsonify(dresses)

@app.route('/api/dress/<int:dress_id>', methods=['GET'])
def get_dress_by_id(dress_id):
    with open('dresses.json') as f:
        dresses = json.load(f)
    dress = next((d for d in dresses if d["id"] == dress_id), None)
    if not dress:
        return jsonify({"error": "Dress not found"}), 404
    return jsonify(dress)

# ----------------------------
# Skin Tone Detection
# ----------------------------
def detect_skin_tone(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w, _ = img.shape

    with mp_face.FaceMesh(static_image_mode=True, max_num_faces=1) as face_mesh:
        results = face_mesh.process(img_rgb)
        if not results.multi_face_landmarks:
            return "Neutral"

        landmarks = results.multi_face_landmarks[0].landmark
        xs = [int(lm.x * w) for lm in landmarks]
        ys = [int(lm.y * h) for lm in landmarks]
        x1, x2 = max(min(xs), 0), min(max(xs), w)
        y1, y2 = max(min(ys), 0), min(max(ys), h)

        face_height = y2 - y1
        face_width = x2 - x1

        regions = [
            (y1 + int(face_height * 0.2), y1 + int(face_height * 0.35),
             x1 + int(face_width * 0.3), x1 + int(face_width * 0.7)),
            (y1 + int(face_height * 0.4), y1 + int(face_height * 0.6),
             x1 + int(face_width * 0.15), x1 + int(face_width * 0.4)),
            (y1 + int(face_height * 0.4), y1 + int(face_height * 0.6),
             x1 + int(face_width * 0.6), x1 + int(face_width * 0.85)),
        ]

        color_samples = []
        for y_start, y_end, x_start, x_end in regions:
            region = img_rgb[y_start:y_end, x_start:x_end]
            if region.size > 0:
                avg_color = region.mean(axis=0).mean(axis=0)
                color_samples.append(avg_color)

        if color_samples:
            avg_color = np.mean(color_samples, axis=0)
            r, g, b = avg_color
        else:
            return "Neutral"

        rgb_pixel = np.uint8([[[r, g, b]]])
        lab_pixel = cv2.cvtColor(rgb_pixel, cv2.COLOR_RGB2LAB)[0][0]
        L, A, B_val = lab_pixel
        ita = np.arctan2(L - 50, B_val) * (180 / np.pi)
        brightness = L

        if ita < -30 and brightness < 45:
            return "Very Dark"
        elif ita < -15 or brightness < 60:
            return "Dark"
        elif (-15 <= ita < 15) or (60 <= brightness < 78):
            return "Medium"
        elif (15 <= ita < 35) or (78 <= brightness < 88):
            return "Light"
        else:
            return "Very Light"

color_map = {
    "Very Dark": [{"name": "Royal Blue", "hex": "#4169E1"}, {"name": "Emerald", "hex": "#50C878"}],
    "Dark": [{"name": "Burgundy", "hex": "#800020"}, {"name": "Olive", "hex": "#808000"}],
    "Medium": [{"name": "Coral", "hex": "#FF7F50"}, {"name": "Peach", "hex": "#FFE5B4"}],
    "Light": [{"name": "Rose", "hex": "#FF007F"}, {"name": "Lavender", "hex": "#E6E6FA"}],
    "Very Light": [{"name": "Navy", "hex": "#000080"}, {"name": "Burgundy", "hex": "#800020"}],
    "Neutral": [{"name": "Beige", "hex": "#F5F5DC"}, {"name": "Gray", "hex": "#808080"}]
}

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files["file"]
    filename = str(uuid.uuid4()) + "_" + file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    skin_tone = detect_skin_tone(file_path)
    colors = color_map.get(skin_tone, color_map["Neutral"])

    message = f"Your skin tone is {skin_tone}. Colors that complement you beautifully: {', '.join([c['name'] for c in colors])}."
    audio_file = str(uuid.uuid4()) + ".mp3"
    audio_path = os.path.join(UPLOAD_FOLDER, audio_file)
    tts = gTTS(text=message)
    tts.save(audio_path)

    return jsonify({
        "message": message,
        "colors": colors,
        "audio_file": audio_file,
        "skinTone": skin_tone
    })

@app.route("/audio/<filename>")
def get_audio(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename), mimetype="audio/mpeg")

# ----------------------------
# Body Posture Analysis
# ----------------------------
def analyze_body_shape(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    npimg = np.array(img)
    with mp_pose.Pose(static_image_mode=True) as pose:
        results = pose.process(npimg)
        if not results.pose_landmarks:
            return None
        lm = results.pose_landmarks.landmark
        shoulder_width = abs(lm[11].x - lm[12].x)
        hip_width = abs(lm[23].x - lm[24].x)
        if shoulder_width > hip_width * 1.1:
            body_type = "Inverted Triangle"
        elif hip_width > shoulder_width * 1.1:
            body_type = "Pear"
        else:
            body_type = "Hourglass"
        outfit_tips = {
            "Inverted Triangle": ["A-line skirts", "V-neck tops"],
            "Pear": ["Flared pants", "Structured tops"],
            "Hourglass": ["Wrap dresses", "Belted waists"]
        }
        return {"bodyType": body_type, "outfits": outfit_tips.get(body_type, [])}

@app.route("/api/body-reco", methods=["POST"])
def body_reco():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No image provided"}), 400
    result = analyze_body_shape(file.read())
    if not result:
        return jsonify({"error": "Body not detected"}), 400
    return jsonify(result)

# ----------------------------
# Virtual Try-On (Mock Demo)
# ----------------------------
from gradio_client import Client, handle_file

@app.route("/api/fashion/tryon", methods=["POST"])
def virtual_tryon():
    user_image = request.files.get("user_image")
    dress_image = request.files.get("dress_image")

    if not user_image or not dress_image:
        return jsonify({"error": "Please upload both images"}), 400

    # Save images
    user_path = os.path.join(UPLOAD_FOLDER, f"user_{uuid.uuid4().hex}.jpg")
    dress_path = os.path.join(UPLOAD_FOLDER, f"dress_{uuid.uuid4().hex}.jpg")
    
    user_image.save(user_path)
    dress_image.save(dress_path)

    try:
        # Use Hugging Face IDM-VTON model
        client = Client("yisol/IDM-VTON")
        result = client.predict(
            dict={"background": handle_file(user_path), "layers": [], "composite": None},
            garm_img=handle_file(dress_path),
            garment_des="",
            is_checked=True,
            is_checked_crop=False,
            denoise_steps=30,
            seed=42,
            api_name="/tryon"
        )
        
        # Save result
        output_filename = f"tryon_{uuid.uuid4().hex}.jpg"
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)
        shutil.copy(result[0], output_path)
        
        return jsonify({"result": f"/tryon_outputs/{output_filename}"})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
# ----------------------------
# Run App
# ----------------------------
if __name__ == "__main__":
    print("\n" + "="*70)
    print("🚀 FASHIONTEL AI BACKEND SERVER v3.0")
    print("="*70)
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print(f"📁 Output folder: {OUTPUT_FOLDER}")
    print("="*70)
    print("🌐 Server running on: http://localhost:5000")
    print("="*70 + "\n")
    app.run(debug=True, host="0.0.0.0", port=5000)
