// 🌐 Auto-switch between LOCAL and PRODUCTION API URLs
let API = "";

if (process.env.NODE_ENV === "production") {
  // Deployed backend URL (Render)
  API = "https://fashintel-virtual-stylist.onrender.com";
} else {
  // Local development server
  API = "http://localhost:5000";
}

// 🔐 Register User
export async function register(data) {
  const res = await fetch(`${API}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// 🔐 Login User
export async function login(data) {
  const res = await fetch(`${API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
