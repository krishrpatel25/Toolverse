"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const analyze = () => {
    if (!text.trim()) return;

    if (text.includes("good") || text.includes("great")) setResult("Positive");
    else if (text.includes("bad") || text.includes("worst"))
      setResult("Negative");
    else setResult("Neutral");
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Sentiment Analyzer</h2>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />

      <Button onClick={analyze}>Analyze Sentiment</Button>

      {result && <p className="text-lg font-semibold">Result: {result}</p>}
    </Card>
  );
}
