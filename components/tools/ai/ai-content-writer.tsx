"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AIContentWriter() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const generate = () => {
    const text = `Article about ${topic}

Introduction
${topic} is becoming very popular today.`;

    setContent(text);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">AI Content Writer</h2>

      <Input value={topic} onChange={(e) => setTopic(e.target.value)} />

      <Button onClick={generate}>Generate</Button>

      {content && <p>{content}</p>}
    </Card>
  );
}
