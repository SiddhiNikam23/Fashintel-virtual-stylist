from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gtts import gTTS
import cv2
import mediapipe as mp
import numpy as np
import os
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- Mediapipe face detection ---
mp_face = mp.solutions.face_mesh

# --- Improved Skin tone detection using ITA (Individual Typology Angle) ---
def detect_skin_tone(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w, _ = img.shape

    with mp_face.FaceMesh(static_image_mode=True, max_num_faces=1) as face_mesh:
        results = face_mesh.process(img_rgb)
        if not results.multi_face_landmarks:
            return "Neutral"

        # Get face bounding box from landmarks
        landmarks = results.multi_face_landmarks[0].landmark
        xs = [int(lm.x * w) for lm in landmarks]
        ys = [int(lm.y * h) for lm in landmarks]
        x1, x2 = max(min(xs), 0), min(max(xs), w)
        y1, y2 = max(min(ys), 0), min(max(ys), h)
        
        # Extract multiple regions for better accuracy
        # Focus on forehead, cheeks, and nose areas
        face_height = y2 - y1
        face_width = x2 - x1
        
        # Define regions (adjust percentages as needed)
        regions = [
            # Forehead
            (y1 + int(face_height * 0.2), y1 + int(face_height * 0.35),
             x1 + int(face_width * 0.3), x1 + int(face_width * 0.7)),
            # Left cheek
            (y1 + int(face_height * 0.4), y1 + int(face_height * 0.6),
             x1 + int(face_width * 0.15), x1 + int(face_width * 0.4)),
            # Right cheek
            (y1 + int(face_height * 0.4), y1 + int(face_height * 0.6),
             x1 + int(face_width * 0.6), x1 + int(face_width * 0.85)),
        ]
        
        color_samples = []
        for y_start, y_end, x_start, x_end in regions:
            region = img_rgb[y_start:y_end, x_start:x_end]
            if region.size > 0:
                avg_color = region.mean(axis=0).mean(axis=0)
                color_samples.append(avg_color)
        
        # Average across all regions
        if color_samples:
            avg_color = np.mean(color_samples, axis=0)
            r, g, b = avg_color
        else:
            return "Neutral"

        # Convert RGB to LAB color space for better skin tone analysis
        # LAB is more perceptually uniform than RGB
        rgb_pixel = np.uint8([[[r, g, b]]])
        lab_pixel = cv2.cvtColor(rgb_pixel, cv2.COLOR_RGB2LAB)[0][0]
        L, A, B_val = lab_pixel
        
        # Calculate ITA (Individual Typology Angle)
        # ITA = [arctan((L - 50) / B)] × (180/π)
        ita = np.arctan2(L - 50, B_val) * (180 / np.pi)
        
        # Also use brightness (L value) for classification
        brightness = L
        
        # Enhanced classification using both ITA and brightness
        # Very Dark: ITA < -30 and L < 45
        # Dark: ITA < -15 or L < 55
        # Medium: -15 <= ITA < 15 or 55 <= L < 75
        # Light: 15 <= ITA < 35 or 75 <= L < 85
        # Very Light: ITA >= 35 or L >= 85
        
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

# --- Enhanced Color map with more skin tone categories ---
color_map = {
    "Very Dark": [
        {"name": "Royal Blue", "hex": "#4169E1"},
        {"name": "Emerald", "hex": "#50C878"},
        {"name": "Fuchsia", "hex": "#FF00FF"},
        {"name": "Gold", "hex": "#FFD700"},
        {"name": "Coral", "hex": "#FF7F50"},
        {"name": "Turquoise", "hex": "#40E0D0"}
    ],
    "Dark": [
        {"name": "Burgundy", "hex": "#800020"},
        {"name": "Olive", "hex": "#808000"},
        {"name": "Mustard", "hex": "#FFDB58"},
        {"name": "Teal", "hex": "#008080"},
        {"name": "Orange", "hex": "#FF8C00"},
        {"name": "Purple", "hex": "#800080"}
    ],
    "Medium": [
        {"name": "Coral", "hex": "#FF7F50"},
        {"name": "Peach", "hex": "#FFE5B4"},
        {"name": "Olive", "hex": "#808000"},
        {"name": "Rust", "hex": "#B7410E"},
        {"name": "Sage", "hex": "#9DC183"},
        {"name": "Mauve", "hex": "#E0B0FF"}
    ],
    "Light": [
        {"name": "Rose", "hex": "#FF007F"},
        {"name": "Lavender", "hex": "#E6E6FA"},
        {"name": "Mint", "hex": "#98FF98"},
        {"name": "Powder Blue", "hex": "#B0E0E6"},
        {"name": "Blush", "hex": "#FFC0CB"},
        {"name": "Lilac", "hex": "#C8A2C8"}
    ],
    "Very Light": [
        {"name": "Navy", "hex": "#000080"},
        {"name": "Burgundy", "hex": "#800020"},
        {"name": "Forest Green", "hex": "#228B22"},
        {"name": "Plum", "hex": "#8E4585"},
        {"name": "Crimson", "hex": "#DC143C"},
        {"name": "Sapphire", "hex": "#0F52BA"}
    ],
    "Neutral": [
        {"name": "Beige", "hex": "#F5F5DC"},
        {"name": "Gray", "hex": "#808080"},
        {"name": "White", "hex": "#FFFFFF"},
        {"name": "Taupe", "hex": "#483C32"},
        {"name": "Charcoal", "hex": "#36454F"},
        {"name": "Cream", "hex": "#FFFDD0"}
    ]
}

# --- Analyze route ---
@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files["file"]
    filename = str(uuid.uuid4()) + "_" + file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    skin_tone = detect_skin_tone(file_path)
    colors = color_map.get(skin_tone, color_map["Neutral"])

    message = f"Your skin tone is {skin_tone}. Colors that complement you beautifully: {', '.join([c['name'] for c in colors])}."

    # Generate audio
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

# --- Audio route ---
@app.route("/audio/<filename>")
def get_audio(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename), mimetype="audio/mpeg")

# --- Test route ---
@app.route("/")
def home():
    return "Flask AI Try-On server running!"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)