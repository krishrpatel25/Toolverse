"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown, Activity } from "lucide-react";
import { toast } from "sonner";

export function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ score: number; label: string; confidence: number } | null>(null);

  const analyze = () => {
    if (!text.trim()) {
      toast.error("Please enter text to analyze");
      return;
    }

    // Simple mock logic
    const lower = text.toLowerCase();
    let score = 50;

    const positiveWords = ['good', 'great', 'awesome', 'excellent', 'love', 'happy', 'fantastic', 'wonderful', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'worst', 'poor', 'disappointing', 'angry'];

    positiveWords.forEach(w => { if (lower.includes(w)) score += 15; });
    negativeWords.forEach(w => { if (lower.includes(w)) score -= 15; });

    score = Math.max(0, Math.min(100, score));

    let label = "Neutral";
    if (score > 60) label = "Positive";
    if (score < 40) label = "Negative";

    setResult({
      score,
      label,
      confidence: Math.floor(70 + Math.random() * 25) // mock confidence 70-95%
    });

    toast.success("Analysis complete");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Sentiment Analyzer</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Enter text to analyze</label>
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResult(null);
              }}
              placeholder="I absolutely loved the customer service! (Try entering something positive or negative)"
              className="h-32"
            />
          </div>

          <Button onClick={analyze} className="w-full">
            <Activity className="w-4 h-4 mr-2" />
            Analyze Sentiment
          </Button>

          {result && (
            <div className="mt-6 pt-6 border-t flex flex-col items-center">
              <div className="flex justify-center mb-4">
                {result.label === 'Positive' && <Smile className="w-16 h-16 text-emerald-500" />}
                {result.label === 'Neutral' && <Meh className="w-16 h-16 text-yellow-500" />}
                {result.label === 'Negative' && <Frown className="w-16 h-16 text-rose-500" />}
              </div>

              <h3 className="text-xl font-bold mb-1">{result.label}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Confidence Score: {result.confidence}%
              </p>

              <div className="w-full max-w-sm">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-500">Negative</span>
                  <span className="text-yellow-500">Neutral</span>
                  <span className="text-emerald-500">Positive</span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 left-0 transition-all duration-1000 ease-out"
                    style={{
                      width: `${result.score}%`,
                      backgroundColor: result.label === 'Positive' ? '#10b981' : result.label === 'Negative' ? '#f43f5e' : '#eab308'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
