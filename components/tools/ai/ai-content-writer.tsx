"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PenTool, Copy } from "lucide-react";
import { toast } from "sonner";

export function AIContentWriter() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");

  const write = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    const kwArray = keywords.split(',').map(k => k.trim()).filter(Boolean);
    const keywordsText = kwArray.length > 0 ? ` It incorporates key concepts such as ${kwArray.join(', ')}.` : '';

    const mockArticle = `The definitive guide to ${topic}

In today's fast-paced world, ${topic} has emerged as a crucial topic of discussion among professionals and enthusiasts alike.${keywordsText} As we dive deeper into this subject, it becomes evident that understanding the nuances can significantly impact one's approach and overall success.

Key Benefits of ${topic}:
1. Increased efficiency and productivity
2. Better utilization of resources
3. Enhanced long-term outcomes

Whether you are just starting out or looking to refine your existing knowledge, keeping up to date with the latest trends in ${topic} is essential. By implementing best practices, anyone can leverage its full potential.

Conclusion:
To wrap up, the significance of ${topic} cannot be overstated. We encourage readers to further explore this fascinating area and discover new ways to integrate it into their daily routines.`;

    setContent(mockArticle);
    toast.success("Content generated");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">AI Content Writer</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Article Topic</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The future of sustainable energy"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Keywords (comma separated, optional)</label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="solar panels, wind power, clean energy"
            />
          </div>

          <Button onClick={write} className="w-full mt-2">
            <PenTool className="w-4 h-4 mr-2" />
            Generate Article
          </Button>

          {content && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Generated Content</label>
                <Button variant="ghost" size="sm" onClick={() => {
                  navigator.clipboard.writeText(content);
                  toast.success("Copied to clipboard");
                }}>
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
              <Textarea
                readOnly
                value={content}
                className="h-64 font-serif leading-relaxed"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
