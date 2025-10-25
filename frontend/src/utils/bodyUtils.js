// bodyUtils.js
function dist(a,b){
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function averageKeypoint(kp){
  if (!kp) return null;
  return {x: kp.x, y: kp.y};
}

function classifyBodyFromPose(pose){
  if(!pose || !pose.keypoints) return {bodyType: "unknown"};
  const kp = {};
  pose.keypoints.forEach(p => kp[p.name || p.part] = {x: p.x, y: p.y, score: p.score || p.probability});

  const leftShoulder = kp.left_shoulder || kp.leftShoulder || kp.leftShoulder;
  const rightShoulder = kp.right_shoulder || kp.rightShoulder;
  const leftHip = kp.left_hip || kp.leftHip;
  const rightHip = kp.right_hip || kp.rightHip;
  const leftWaist = kp.left_hip; // fallback
  const rightWaist = kp.right_hip;

  if(!leftShoulder || !rightShoulder || !leftHip || !rightHip) return {bodyType: "unknown"};

  const shoulderWidth = dist(leftShoulder, rightShoulder);
  const hipWidth = dist(leftHip, rightHip);
  const waistWidth = (dist(leftWaist, rightWaist) || (shoulderWidth + hipWidth)/2) ;

  const s_h = shoulderWidth / hipWidth;
  const w_s = waistWidth / shoulderWidth;

  // Simple rules:
  let bodyType = "rectangle";
  if (Math.abs(shoulderWidth - hipWidth) < 0.12 * shoulderWidth && w_s < 0.75) {
    bodyType = "hourglass";
  } else if (shoulderWidth > hipWidth * 1.12) {
    bodyType = "inverted_triangle";
  } else if (hipWidth > shoulderWidth * 1.12) {
    bodyType = "pear";
  } else if (w_s >= 1.0) {
    bodyType = "apple";
  } else {
    bodyType = "rectangle";
  }

  // map to suggestions (short)
  const suggestions = {
    hourglass: ["wrap dress", "belted waist", "fitted silhouettes"],
    rectangle: ["peplum tops", "ruching", "layering to create curves"],
    pear: ["bright tops", "structured shoulders", "A-line skirts"],
    inverted_triangle: ["A-line skirts", "wide-leg pants", "simple tops"],
    apple: ["V-necks", "long lines", "empire waist dresses"],
    unknown: ["classic styles"]
  };

  return {
    bodyType,
    ratios: {shoulderWidth, hipWidth, waistWidth, s_h, w_s},
    clothes: suggestions[bodyType] || suggestions.unknown
  };
}

export default { classifyBodyFromPose };
