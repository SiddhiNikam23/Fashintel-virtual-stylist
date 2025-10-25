// TrendPredictionPage.jsx
import React, { useState } from "react";
import BodyAnalyzer from "../components/BodyAnalyzer";
import OutfitRecommendation from "../components/OutfitRecommendation";

export default function TrendPredictionPage() {
  const [analysis, setAnalysis] = useState(null); // to store body analysis result

  return (
    <div>
      <h2>Outfit Recommendation Based on Body Type</h2>
      <BodyAnalyzer onResult={setAnalysis} /> 
      {/* this connects BodyAnalyzer to OutfitRecommendation */}
      <OutfitRecommendation analysis={analysis} faceTone="warm" />
    </div>
  );
}
