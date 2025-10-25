import React, { useState, useEffect } from "react";

function TryOnAvatar() {
  // Get dressId from URL if needed
  const searchParams = new URLSearchParams(window.location.search);
  const dressId = searchParams.get("dressId");

  const [bodyImage, setBodyImage] = useState(null);
  const [dressImage, setDressImage] = useState(null);
  const [bodyPreview, setBodyPreview] = useState(null);
  const [dressPreview, setDressPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (dressId) {
      fetch(`http://127.0.0.1:5000/api/dress/${dressId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error && data.img) {
            setDressPreview(`http://127.0.0.1:5000${data.img}`);
          } else {
            setError("Dress not found!");
          }
        })
        .catch((err) => {
          console.error("Error fetching dress:", err);
          setError("Failed to load dress image!");
        });
    }
  }, [dressId]);

  const handleBodyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBodyImage(file);
      setBodyPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleDressImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDressImage(file);
      setDressPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleTryOn = async () => {
    if (!bodyImage) {
      alert("Please upload your photo!");
      return;
    }
    if (!dressImage && !dressPreview) {
      alert("No dress selected!");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("user_image", bodyImage);

    if (dressImage) {
      formData.append("dress_image", dressImage);
    } else if (dressPreview) {
      const response = await fetch(dressPreview);
      const blob = await response.blob();
      formData.append("dress_image", blob, "dress.png");
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/fashion/tryon", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.result) {
        const imageUrl = `http://127.0.0.1:5000${data.result}`;
        setResult({ result: imageUrl });
      } else {
        setError(data.error || "Try-on failed!");
      }
    } catch (err) {
      setError("Failed to connect to backend!");
    } finally {
      setLoading(false);
    }
  };

  const SparkleIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ display: "inline", marginRight: "10px" }}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#8b5cf6" />
    </svg>
  );

  const UploadIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto" }}>
      <path
        d="M24 32V16M24 16L18 22M24 16L30 22"
        stroke="#a78bfa"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 36H34"
        stroke="#a78bfa"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const CameraIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: "8px" }}>
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="white" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
      <path d="M9 6L10 4H14L15 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(180deg, #f3e7ff 0%, #e9d5ff 100%)",
      }}
    >
      <div style={{ 
        textAlign: "center", 
        marginBottom: "50px",
      }}>
        <SparkleIcon />
        <h1 style={{ 
          fontSize: "42px", 
          color: "#7c3aed",
          marginBottom: "12px",
          fontWeight: "700",
        }}>
          AI Virtual Try-On
        </h1>
        <p style={{ 
          fontSize: "18px", 
          color: "#6b7280",
          fontWeight: "400",
        }}>
          Discover your perfect color palette with AI-powered analysis
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "white",
          borderRadius: "24px",
          padding: "60px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "40px",
            maxWidth: "800px",
            margin: "0 auto 40px auto",
          }}
        >
          {/* User Photo Upload */}
          <div>
            <label style={{ cursor: "pointer", display: "block" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleBodyImageChange}
                style={{ display: "none" }}
              />
              {!bodyPreview ? (
                <div
                  style={{
                    border: "2px dashed #d8b4fe",
                    borderRadius: "16px",
                    padding: "80px 30px",
                    textAlign: "center",
                    background: "#faf5ff",
                    transition: "all 0.3s ease",
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <UploadIcon />
                  <p style={{ 
                    fontSize: "18px", 
                    fontWeight: "600",
                    color: "#8b5cf6",
                    marginTop: "16px",
                    marginBottom: "6px",
                  }}>
                    Upload your photo
                  </p>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#9ca3af",
                    margin: 0,
                  }}>
                    Click or drag and drop
                  </p>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    src={bodyPreview}
                    alt="Your photo"
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "2px solid #e9d5ff",
                    }}
                  />
                </div>
              )}
            </label>
          </div>

          {/* Dress Image Upload */}
          <div>
            <label style={{ cursor: "pointer", display: "block" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleDressImageChange}
                style={{ display: "none" }}
              />
              {!dressPreview ? (
                <div
                  style={{
                    border: "2px dashed #d8b4fe",
                    borderRadius: "16px",
                    padding: "80px 30px",
                    textAlign: "center",
                    background: "#faf5ff",
                    transition: "all 0.3s ease",
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <UploadIcon />
                  <p style={{ 
                    fontSize: "18px", 
                    fontWeight: "600",
                    color: "#8b5cf6",
                    marginTop: "16px",
                    marginBottom: "6px",
                  }}>
                    Upload garment photo
                  </p>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#9ca3af",
                    margin: 0,
                  }}>
                    Click or drag and drop
                  </p>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    src={dressPreview}
                    alt="Garment"
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "2px solid #e9d5ff",
                    }}
                  />
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          onClick={handleTryOn}
          disabled={loading}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "12px",
            background: loading ? "#d1d5db" : "linear-gradient(90deg, #a78bfa 0%, #7dd3fc 100%)",
            color: "white",
            fontSize: "17px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
            boxShadow: loading ? "none" : "0 4px 12px rgba(139, 92, 246, 0.25)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: "16px",
                height: "16px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTop: "2px solid white",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                marginRight: "10px",
              }} />
              Processing...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          ) : (
            <>
              <CameraIcon />
              Analyze My Colors
            </>
          )}
        </button>

        {error && (
          <div style={{ 
            marginTop: "20px",
            padding: "14px",
            background: "#fee2e2",
            borderRadius: "12px",
            border: "1px solid #fca5a5",
          }}>
            <p style={{ 
              color: "#dc2626", 
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "500",
              margin: 0,
            }}>
              {error}
            </p>
          </div>
        )}

        {result && (
          <div style={{ 
            textAlign: "center", 
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <h3 style={{ 
              fontSize: "24px", 
              color: "#7c3aed",
              marginBottom: "24px",
              fontWeight: "600",
            }}>
              Your Try-On Result
            </h3>
            <img
              src={result.result}
              alt="Try-on result"
              style={{
                maxWidth: "400px",
                width: "100%",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                border: "2px solid #e9d5ff",
              }}
            />
          </div>
        )}

        <p style={{ 
          textAlign: "center", 
          marginTop: "32px",
          fontSize: "14px",
          color: "#9ca3af",
          margin: "32px 0 0 0",
        }}>
          Powered by AI • Find your perfect style
        </p>
      </div>
    </div>
  );
}

export default TryOnAvatar;