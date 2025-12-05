// 🌐 Auto-switch between LOCAL and PRODUCTION API URLs
let API = '';

if (process.env.NODE_ENV === 'production') {
  // Deployed backend URL (Render)
  API = 'https://YOUR-RENDER-BACKEND-URL';
} else {
  // Local development server
  API = 'http://localhost:5000';
}

// 🔐 Register User
export async function register(data) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔐 Login User
export async function login(data) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
