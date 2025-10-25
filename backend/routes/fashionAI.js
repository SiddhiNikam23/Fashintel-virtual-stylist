import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post(
  "/tryon",
  upload.fields([
    { name: "body", maxCount: 1 },
    { name: "dress", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      if (!req.files || !req.files.body || !req.files.dress) {
        return res.status(400).json({ error: "Missing images" });
      }

      console.log("📥 Received files:", req.files);
      res.json({
        success: true,
        message: "Images uploaded successfully",
        files: req.files,
      });
    } catch (err) {
      console.error("❌ Error in /tryon route:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
