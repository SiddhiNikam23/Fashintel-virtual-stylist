// BodyAnalyzer.jsx
import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import bodyUtils from "../utils/bodyUtils";

export default function BodyAnalyzer({ onResult }) {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((res) => (img.onload = res));

    // create offscreen canvas
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // load pose detector
    await tf.ready();
    const detector = await posedetection.createDetector(
      posedetection.SupportedModels.MoveNet, 
      {modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING}
    );

    const poses = await detector.estimatePoses(img);
    const pose = poses && poses[0];

    // optional: body segmentation using body-pix for waist detection (not shown)
    const classification = bodyUtils.classifyBodyFromPose(pose);

    // pass result to parent
    onResult({ file, pose, classification });
    setLoading(false);
  }

 
}
