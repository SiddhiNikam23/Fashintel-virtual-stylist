from gradio_client import Client

try:
    print("Testing Hugging Face connection...")
    client = Client("yisol/IDM-VTON")
    print("✅ Connection successful!")
except Exception as e:
    print(f"❌ Connection failed: {e}")