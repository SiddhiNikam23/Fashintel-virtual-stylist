import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, User, Shirt, Palette, TrendingUp, Award, CheckCircle } from 'lucide-react';

// Mock bodyUtils for demo (replace with your actual import)
const bodyUtils = {
  classifyBodyFromPose: (pose) => {
    const bodyTypes = ['hourglass', 'rectangle', 'pear', 'inverted_triangle', 'apple'];
    const randomType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
    
    const suggestions = {
      hourglass: ["wrap dress", "belted waist", "fitted silhouettes"],
      rectangle: ["peplum tops", "ruching", "layering to create curves"],
      pear: ["bright tops", "structured shoulders", "A-line skirts"],
      inverted_triangle: ["A-line skirts", "wide-leg pants", "simple tops"],
      apple: ["V-necks", "long lines", "empire waist dresses"]
    };
    
    return {
      bodyType: randomType,
      ratios: { shoulderWidth: 45, hipWidth: 42, waistWidth: 32 },
      clothes: suggestions[randomType]
    };
  }
};

export default function AIBodyStyleAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [faceTone, setFaceTone] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      setSelectedImage(e.target.result);
      await analyzeBody(e.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  const analyzeBody = async (imageData, file) => {
    setAnalyzing(true);
    
    // Simulate pose detection and analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock pose data (in real app, this comes from TensorFlow)
    const mockPose = {
      keypoints: [
        { name: 'left_shoulder', x: 100, y: 150, score: 0.9 },
        { name: 'right_shoulder', x: 200, y: 150, score: 0.9 },
        { name: 'left_hip', x: 110, y: 300, score: 0.85 },
        { name: 'right_hip', x: 190, y: 300, score: 0.85 }
      ]
    };
    
    // Use bodyUtils to classify
    const classification = bodyUtils.classifyBodyFromPose(mockPose);
    
    // Mock face tone detection
    const tones = ['warm', 'cool', 'neutral'];
    const detectedTone = tones[Math.floor(Math.random() * tones.length)];
    
    setAnalysis({
      file,
      pose: mockPose,
      classification
    });
    setFaceTone(detectedTone);
    setAnalyzing(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const fakeEvent = { target: { files: [file] } };
      handleFileSelect(fakeEvent);
    }
  };

  const bodyTypeDescriptions = {
    hourglass: "Balanced shoulders and hips with a defined waist",
    rectangle: "Similar shoulder, waist, and hip measurements",
    pear: "Hips wider than shoulders with a defined waist",
    inverted_triangle: "Shoulders wider than hips",
    apple: "Weight carried around the midsection"
  };

  const colorPalettes = {
    warm: {
      colors: ['#D4A574', '#E8B75D', '#C17B5C'],
      names: ['Olive', 'Mustard', 'Peach']
    },
    cool: {
      colors: ['#1E3A8A', '#A78BFA', '#10B981'],
      names: ['Navy', 'Lavender', 'Emerald']
    },
    neutral: {
      colors: ['#000000', '#FFFFFF', '#F5F5DC'],
      names: ['Black', 'White', 'Beige']
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        style={{ display: 'none', position: 'absolute', visibility: 'hidden' }}
      />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Body & Style Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover your body type and perfect style with AI-powered analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {!selectedImage ? (
          /* Upload Section */
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-3 border-dashed border-purple-300 rounded-2xl p-16 text-center hover:border-purple-500 transition-colors cursor-pointer bg-gradient-to-br from-purple-50 to-transparent"
              onClick={handleUploadClick}
            >
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 15C3 15 4 21 12 21C20 21 21 15 21 15" stroke="#9333EA" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Upload your photo
              </h2>
              <p className="text-gray-500 mb-6">
                Click or drag and drop
              </p>
            </div>

            <button
              onClick={handleUploadClick}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              Analyze My Body Type
            </button>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Body Type Detection</p>
              </div>
              <div className="p-4">
                <Shirt className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Style Recommendations</p>
              </div>
              <div className="p-4">
                <Palette className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Color Palette</p>
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              Powered by AI • Find your perfect style
            </p>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Your Image</h3>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    setFaceTone(null);
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Upload New
                </button>
              </div>
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>

            {analyzing ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
                </div>
                <p className="text-xl font-semibold text-gray-700">Analyzing your body type...</p>
                <p className="text-gray-500 mt-2">Detecting pose and measurements ✨</p>
              </div>
            ) : analysis && (
              <>
                {/* Body Type Result */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center mb-6">
                    <User className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Your Body Type</h3>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold text-purple-700 capitalize mb-2">
                          {analysis.classification.bodyType.replace('_', ' ')}
                        </p>
                        <p className="text-gray-600">
                          {bodyTypeDescriptions[analysis.classification.bodyType]}
                        </p>
                      </div>
                      <Award className="w-16 h-16 text-purple-400" />
                    </div>
                  </div>

                  {/* Body Measurements */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {analysis.classification.ratios.shoulderWidth}cm
                      </p>
                      <p className="text-sm text-gray-600">Shoulders</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {analysis.classification.ratios.waistWidth}cm
                      </p>
                      <p className="text-sm text-gray-600">Waist</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {analysis.classification.ratios.hipWidth}cm
                      </p>
                      <p className="text-sm text-gray-600">Hips</p>
                    </div>
                  </div>
                </div>

                {/* Style Recommendations */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center mb-6">
                    <Shirt className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Recommended Styles</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {analysis.classification.clothes.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-gradient-to-r from-purple-50 to-transparent rounded-lg p-4">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800 capitalize">{item}</p>
                          <p className="text-sm text-gray-600">Perfect for your body type</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center mb-6">
                    <Palette className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Your Color Palette</h3>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
                    <p className="text-lg font-semibold text-purple-700 capitalize">
                      Skin Tone: {faceTone}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {colorPalettes[faceTone]?.colors.map((color, idx) => (
                      <div key={idx} className="text-center">
                        <div
                          className="w-full h-24 rounded-xl shadow-lg mb-2 border-2 border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-sm font-medium text-gray-700">
                          {colorPalettes[faceTone].names[idx]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Tip:</strong> These colors complement your {faceTone} skin tone and will make you look radiant!
                    </p>
                  </div>
                </div>

                {/* Final Tips */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Styling Tips</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-purple-500 text-xl mr-3">✓</span>
                      <p className="text-gray-700">
                        Choose fabrics that drape well and complement your body shape
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-500 text-xl mr-3">✓</span>
                      <p className="text-gray-700">
                        Mix and match colors from your palette for cohesive looks
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-500 text-xl mr-3">✓</span>
                      <p className="text-gray-700">
                        Invest in key pieces that work with your body type
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}