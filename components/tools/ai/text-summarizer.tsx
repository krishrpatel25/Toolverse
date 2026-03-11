"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

export function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const summarize = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to summarize");
      return;
    }
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const short = sentences.slice(0, Math.max(1, Math.ceil(sentences.length / 3))).join(" ");

    setSummary(short);
    toast.success("Text summarized successfully");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">AI Text Summarizer</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Original Text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-40"
              placeholder="Paste your long text here..."
            />
          </div>

          <Button onClick={summarize} className="w-full">
            <Wand2 className="w-4 h-4 mr-2" />
            Summarize
          </Button>

          {summary && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Summary</label>
                <Button variant="ghost" size="sm" onClick={async () => {
                  const success = await copyToClipboard(summary);
                  if (success) toast.success("Copied to clipboard");
                  else toast.error("Failed to copy");
                }}>
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
              </div>
              <Textarea
                readOnly
                value={summary}
                className="h-32 bg-muted/50"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
