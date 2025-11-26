<p align="center">
  <img src="dashboard.jpeg" width="700"/>
</p>

<p align="center">
  <img src="feature%201.jpeg" width="700"/>
</p>

<p align="center">
  <img src="feature2.jpeg" width="700"/>
</p>

<p align="center">
  <img src="feature2%20output.jpeg" width="700"/>
</p>

---

# 🧥 FashIntel — AI-Powered Virtual Try-On

FashIntel is a smart, web-based AI fashion assistant that allows users to virtually try on clothing.  
Upload your photo, select a garment, and the system intelligently detects whether it’s a top, bottom, dress, or full outfit — then applies it realistically.

---

## ✅ Key Features

- 👤 Upload & preview user photos  
- 👗 Choose garments to try on virtually  
- 🤖 Auto garment type detection (Top, Bottom, Dress, Full Outfit)  
- 🧠 AI-powered try-on generation using Hugging Face models  
- 📷 Remove/replace image or garment anytime  
- ⚡ Smooth & responsive UI  
- 🔄 Real-time backend processing  
- 🔒 Secure environment variable handling

---

## 🛠️ Tech Stack

### **Frontend**
- HTML, CSS, JavaScript  
- React (optional depending on repo)  
- Responsive UI design  

### **Backend**
- Node.js  
- Express.js  
- REST API architecture  

### **Database**
- MongoDB (Atlas or Local)

### **AI / Cloud**
- Hugging Face Inference API

### **Other Tools**
- GitHub  
- Postman (for API testing)  
- `.env` for secret management

---

## ⚠️ Disclaimer

This project uses third-party AI services (Hugging Face).  
Users must generate and use their **own API keys and MongoDB connection string**.  
Environment variables are intentionally kept private using `.gitignore`.  
**Do NOT commit your credentials to GitHub.**

---

## 🔧 Setup Instructions

This repo does **NOT** include private credentials for security reasons.

Before running the backend, create a `.env` file inside the backend folder and add:

```env
MONGODB_URI=your_mongodb_connection_string
HF_API_TOKEN=your_huggingface_api_token
PORT=5000
