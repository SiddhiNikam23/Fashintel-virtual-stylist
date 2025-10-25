import React, { useState } from 'react';
import { Camera, Sparkles, Copy, Volume2, Upload } from 'lucide-react';

const BACKEND_URL = "http://192.168.137.1:5000";

export default function AIRecommendation() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleAnalyze() {
    if (!file) return alert("Please select an image!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Analysis failed! Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.message);
    alert("Copied to clipboard!");
  }

  function handleSpeak() {
    const utterance = new SpeechSynthesisUtterance(result.message);
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Color Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover your perfect color palette with AI-powered analysis
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Upload Section */}
            <div className="mb-8">
              <label className="block mb-4">
                <div className="relative border-3 border-dashed border-purple-200 rounded-2xl p-8 hover:border-purple-400 transition-all cursor-pointer bg-purple-50/30 hover:bg-purple-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    {preview ? (
                      <div className="flex flex-col items-center gap-4">
                        <img src={preview} alt="Preview" className="max-h-48 rounded-xl shadow-lg" />
                        <p className="text-sm text-gray-600 font-medium">Click to change image</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="w-16 h-16 text-purple-400" />
                        <div>
                          <p className="text-lg font-semibold text-gray-700">Upload your photo</p>
                          <p className="text-sm text-gray-500 mt-1">Click or drag and drop</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </label>

              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Analyze My Colors
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="space-y-6 animate-fadeIn">
                {/* Skin Tone */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Your Skin Tone
                  </h3>
                  <p className="text-2xl font-semibold text-purple-700">{result.skinTone}</p>
                </div>

                {/* Recommended Colors */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Perfect Colors for You</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {result.colors.map((c, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div
                          className="w-16 h-16 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border-2 border-white"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                        <span className="text-xs font-medium text-gray-600 text-center">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-gray-700 leading-relaxed">{result.message}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Results
                  </button>
                  <button
                    onClick={handleSpeak}
                    className="flex-1 bg-white border-2 border-purple-300 text-purple-700 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    Listen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Powered by AI • Find your perfect style
        </div>
      </div>
    </div>
  );
}