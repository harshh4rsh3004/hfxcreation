const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { Resend } = require("resend");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const resend = new Resend(process.env.RESEND_API_KEY);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    ok: false,
    error: "Too many requests. Please try again later."
  }
});

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "HFX Creation Backend is running 🚀"
  });
});

// ================= CLOUD UPLOAD =================

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        ok: false,
        error: "No file uploaded"
      });
    }

    const resourceType = req.file.mimetype.startsWith("video/")
      ? "video"
      : "image";

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "hfx-creation",
          resource_type: resourceType
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    res.json({
      ok: true,
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type
    });

  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      ok: false,
      error: "Cloud upload failed"
    });
  }
});

// ================= CLIENT ENQUIRY =================

app.post(
  "/api/contact",
  contactLimiter,
  async (req, res) => {
    try {
      const {
        name,
        email,
        budget,
        message
      } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          ok: false,
          error: "Name, email and message are required"
        });
      }

      await resend.emails.send({
        from: process.env.MAIL_FROM,
        to: process.env.OWNER_EMAIL,
        subject: `New HFX Creation Client Enquiry — ${name}`,

        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6">
            <h2>🔥 New HFX Creation Enquiry</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Budget:</strong> ${budget || "Not specified"}</p>

            <p><strong>Message:</strong></p>

            <div style="
              background:#f5f5f5;
              padding:15px;
              border-radius:8px;
            ">
              ${message}
            </div>

            <hr>

            <p>
              Sent from HFX Creation website.
            </p>
          </div>
        `
      });

      res.json({
        ok: true,
        message: "
