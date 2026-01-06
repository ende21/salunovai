"use client";
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const tabs = [
  { label: "Text", value: "text" },
  { label: "Image", value: "image" },
  { label: "Vision", value: "vision" },
  { label: "Embedding", value: "embedding" },
  { label: "Function Calling", value: "function-calling" },
];

export default function AgentFeaturePage() {
  const [activeTab, setActiveTab] = useState("text");
  // State untuk masing-masing fitur
  const [textPrompt, setTextPrompt] = useState("");
  const [textResult, setTextResult] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [visionImage, setVisionImage] = useState<File | null>(null);
  const [visionResult, setVisionResult] = useState("");
  const [embeddingText, setEmbeddingText] = useState("");
  const [embeddingResult, setEmbeddingResult] = useState<number[]>([]);
  const [functionPrompt, setFunctionPrompt] = useState("");
  const [functionJson, setFunctionJson] = useState("");
  const [functionResult, setFunctionResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler untuk masing-masing fitur
  const handleTextSubmit = async () => {
    setLoading(true);
    setTextResult("");
    const res = await fetch("/api/agent/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: textPrompt })
    });
    const data = await res.json();
    setTextResult(data.result || data.error || "(No response)");
    setLoading(false);
  };

  const handleImageSubmit = async () => {
    setLoading(true);
    setImageResult("");
    const res = await fetch("/api/agent/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: imagePrompt })
    });
    const data = await res.json();
    setImageResult(data.result || data.error || "(No response)");
    setLoading(false);
  };

  const handleVisionSubmit = async () => {
    if (!visionImage) return;
    setLoading(true);
    setVisionResult("");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = (e.target?.result as string)?.split(",")[1];
      const res = await fetch("/api/agent/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 })
      });
      const data = await res.json();
      setVisionResult(data.result || data.error || "(No response)");
      setLoading(false);
    };
    reader.readAsDataURL(visionImage);
  };

  const handleEmbeddingSubmit = async () => {
    setLoading(true);
    setEmbeddingResult([]);
    const res = await fetch("/api/agent/embedding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: embeddingText })
    });
    const data = await res.json();
    setEmbeddingResult(data.result || []);
    setLoading(false);
  };

  const handleFunctionSubmit = async () => {
    setLoading(true);
    setFunctionResult("");
    let functions;
    try {
      functions = JSON.parse(functionJson);
    } catch {
      setFunctionResult("JSON fungsi tidak valid");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/agent/function-calling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: functionPrompt, functions })
    });
    const data = await res.json();
    setFunctionResult(JSON.stringify(data.result || data.error || "(No response)", null, 2));
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Gemini AI Features</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <Button key={tab.value} variant={activeTab === tab.value ? "primary" : "outline"} onClick={() => setActiveTab(tab.value)}>
            {tab.label}
          </Button>
        ))}
      </div>
      <Card className="p-6">
        {activeTab === "text" && (
          <div>
            <h2 className="font-semibold mb-2">Text Generation</h2>
            <textarea className="w-full border rounded p-2 mb-2" rows={3} value={textPrompt} onChange={e => setTextPrompt(e.target.value)} placeholder="Enter prompt..." />
            <Button onClick={handleTextSubmit} disabled={loading || !textPrompt.trim()}>{loading ? "Loading..." : "Generate"}</Button>
            {textResult && <div className="mt-4 p-2 bg-surface-100 rounded">{textResult}</div>}
          </div>
        )}
        {activeTab === "image" && (
          <div>
            <h2 className="font-semibold mb-2">Image Generation</h2>
            <textarea className="w-full border rounded p-2 mb-2" rows={2} value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder="Enter prompt for image..." />
            <Button onClick={handleImageSubmit} disabled={loading || !imagePrompt.trim()}>{loading ? "Loading..." : "Generate"}</Button>
            {imageResult && <div className="mt-4"><img src={`data:image/png;base64,${imageResult}`} alt="Generated" className="max-w-full rounded" /></div>}
          </div>
        )}
        {activeTab === "vision" && (
          <div>
            <h2 className="font-semibold mb-2">Image Understanding (Vision)</h2>
            <input type="file" accept="image/*" onChange={e => setVisionImage(e.target.files?.[0] || null)} className="mb-2" />
            <Button onClick={handleVisionSubmit} disabled={loading || !visionImage}>{loading ? "Loading..." : "Analyze"}</Button>
            {visionResult && <div className="mt-4 p-2 bg-surface-100 rounded">{visionResult}</div>}
          </div>
        )}
        {activeTab === "embedding" && (
          <div>
            <h2 className="font-semibold mb-2">Text Embedding</h2>
            <textarea className="w-full border rounded p-2 mb-2" rows={2} value={embeddingText} onChange={e => setEmbeddingText(e.target.value)} placeholder="Enter text for embedding..." />
            <Button onClick={handleEmbeddingSubmit} disabled={loading || !embeddingText.trim()}>{loading ? "Loading..." : "Embed"}</Button>
            {embeddingResult.length > 0 && (
              <div className="mt-4 p-2 bg-surface-100 rounded text-xs max-h-40 overflow-auto">
                <pre>{JSON.stringify(embeddingResult, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
        {activeTab === "function-calling" && (
          <div>
            <h2 className="font-semibold mb-2">Function Calling</h2>
            <textarea className="w-full border rounded p-2 mb-2" rows={2} value={functionPrompt} onChange={e => setFunctionPrompt(e.target.value)} placeholder="Enter prompt..." />
            <textarea className="w-full border rounded p-2 mb-2" rows={2} value={functionJson} onChange={e => setFunctionJson(e.target.value)} placeholder='Enter functions JSON (e.g. [{"name": "getWeather", "description": "Get weather info"}])' />
            <Button onClick={handleFunctionSubmit} disabled={loading || !functionPrompt.trim() || !functionJson.trim()}>{loading ? "Loading..." : "Call Function"}</Button>
            {functionResult && (
              <div className="mt-4 p-2 bg-surface-100 rounded text-xs max-h-40 overflow-auto">
                <pre>{functionResult}</pre>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
