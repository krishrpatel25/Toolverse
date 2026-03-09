"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const summarize = () => {
    const sentences = text.split(".");
    const short = sentences.slice(0, 2).join(".") + ".";

    setSummary(short);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">AI Text Summarizer</h2>

      <Textarea value={text} onChange={(e) => setText(e.target.value)} />

      <Button onClick={summarize}>Summarize</Button>

      {summary && <p>{summary}</p>}
    </Card>
  );
}
