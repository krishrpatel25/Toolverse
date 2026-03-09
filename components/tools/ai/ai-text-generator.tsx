"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function AITextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    const intros = [
      `${prompt} is becoming increasingly important in today's world.`,
      `Many experts believe that ${prompt} plays a key role in modern industries.`,
      `${prompt} has gained significant attention in recent years.`,
      `Understanding ${prompt} is essential for individuals and businesses today.`,
    ];

    const bodies = [
      `Learning about ${prompt} helps people improve their knowledge and decision making.`,
      `Companies are investing more resources into ${prompt} to remain competitive.`,
      `${prompt} opens new opportunities for innovation and development.`,
      `By exploring ${prompt}, individuals can build valuable skills for the future.`,
    ];

    const endings = [
      `As technology evolves, ${prompt} will continue to shape the future.`,
      `In the coming years, ${prompt} will remain a powerful influence across industries.`,
      `Overall, ${prompt} will play a critical role in modern development.`,
      `For anyone interested in growth, understanding ${prompt} is extremely valuable.`,
    ];

    const random = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

    let paragraph = `
${random(intros)}

${random(bodies)}

${random(endings)}
`;

    let words = 80;

    if (length === "Short") words = 40;
    if (length === "Medium") words = 80;
    if (length === "Long") words = 160;

    let generated = "";

    while (generated.split(" ").length < words) {
      generated += " " + paragraph;
    }

    generated = generated.trim();

    setResult(`${generated}\n\nTone: ${tone}`);

    toast.success("Text generated");
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied");
  };

  const clear = () => {
    setPrompt("");
    setResult("");
  };

  const wordCount = result ? result.split(/\s+/).length : 0;
  const charCount = result.length;

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">AI Text Generator</h2>

      {/* Prompt */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Prompt</label>

        <Textarea
          placeholder="Enter topic or prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-24"
        />
      </div>

      {/* Options */}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>

          <select
            className="w-full border rounded-md p-2 bg-background"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Creative</option>
            <option>Formal</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Length</label>

          <select
            className="w-full border rounded-md p-2 bg-background"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>
      </div>

      <Button onClick={generate}>Generate Text</Button>

      {result && (
        <div className="space-y-4">
          <Textarea value={result} readOnly className="h-40" />

          <div className="text-sm text-muted-foreground flex gap-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={copyText}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>

            <Button variant="destructive" onClick={clear}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
