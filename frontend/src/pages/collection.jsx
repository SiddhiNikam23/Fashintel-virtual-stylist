import React, { useEffect, useState } from "react";

const Collection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dresses")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleTryOn = (id) => {
    window.location.href = `/tryon?dressId=${id}`;
  };

  const SparkleIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ display: "inline", marginRight: "12px" }}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#8b5cf6" />
    </svg>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #faf5ff 0%, #f3e7ff 100%)",
        padding: "60px 20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <SparkleIcon />
        <h1
          style={{
            fontSize: "48px",
            color: "#7c3aed",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          Fashion Collection
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            fontWeight: "400",
          }}
        >
          Explore our curated collection and try them virtually
        </p>
      </div>

      {/* Product Grid */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "24px",
          padding: "0 20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(124, 58, 237, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            {/* Product Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "350px",
                overflow: "hidden",
                background: "#f9fafb",
              }}
            >
              <img
                src={`http://127.0.0.1:5000${p.img}`}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
              
              {/* Quick View Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#8b5cf6",
                }}
              >
                New
              </div>
            </div>

            {/* Product Info */}
            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "8px",
                  lineHeight: "1.4",
                }}
              >
                {p.name}
              </h3>

              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#7c3aed",
                  marginBottom: "16px",
                }}
              >
                ₹{p.price}
              </p>

              {/* Try On Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTryOn(p.id);
                }}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "linear-gradient(90deg, #a78bfa 0%, #7dd3fc 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.25)";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: "8px" }}
                >
                  <rect x="3" y="6" width="18" height="13" rx="2" stroke="white" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
                  <path d="M9 6L10 4H14L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Try On Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          color: "#9ca3af",
          fontSize: "14px",
        }}
      >
        Powered by AI • Find your perfect style
      </div>
    </div>
  );
};

export default Collection;