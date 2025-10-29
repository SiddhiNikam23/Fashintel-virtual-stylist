from gradio_client import Client

try:
    print("Testing Hugging Face connection...")
    client = Client("yisol/IDM-VTON")
    print("✅ Connection successful!")
    print("✅ Your virtual try-on should work!")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    print("\nPossible reasons:")
    print("1. Internet connection issue")
    print("2. Hugging Face API is down")
    print("3. gradio_client not installed properly")