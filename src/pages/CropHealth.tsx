import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Leaf } from 'lucide-react';

export default function CropHealth() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    // Simulate API call for hackathon demo
    setTimeout(() => {
      setResult({
        crop: 'Tomato',
        possibleIssue: 'Early blight',
        confidence: 91,
        severity: 'Moderate',
        recommendedAction: 'Remove heavily affected leaves and monitor nearby plants. AI-based recommendation.'
      });
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">AI Crop Health</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Upload Leaf Image</h3>
            <p className="text-sm text-slate-500 mb-6">JPEG, PNG up to 10MB</p>
            <label className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium cursor-pointer transition-colors">
              Select Image
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
          </div>
        </div>

        {isUploading && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="font-medium text-slate-600">AI is analyzing image...</p>
          </div>
        )}

        {result && !isUploading && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-4 flex items-center gap-2 text-white">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold">AI Analysis Result</h3>
              <span className="ml-auto px-2 py-0.5 bg-white/20 rounded text-xs font-bold">DEMO AI</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Crop</p>
                  <p className="font-bold text-slate-800">{result.crop}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Confidence</p>
                  <p className="font-bold text-emerald-600">{result.confidence}%</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900">Possible Issue: {result.possibleIssue}</h4>
                    <p className="text-sm text-amber-700/80 font-medium">Severity: {result.severity}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  AI Recommendation
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {result.recommendedAction}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
