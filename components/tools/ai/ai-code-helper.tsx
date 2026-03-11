"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Copy } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

export function AICodeHelper() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generate = () => {
    if (!question.trim()) {
      toast.error("Please enter a question or prompt");
      return;
    }

    const code = `// AI Generated solution for: "${question}"\n\nfunction solution() {\n  console.log("This is a mock response");\n  // Add your logic here\n  return true;\n}\n\nmodule.exports = solution;`;
    setAnswer(code);
    toast.success("Code generated");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">AI Code Helper</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Describe what you want to build</label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Write a function to reverse a string in JavaScript..."
              className="h-24"
            />
          </div>

          <Button onClick={generate} className="w-full">
            <Code className="w-4 h-4 mr-2" />
            Generate Code
          </Button>

          {answer && (
            <div className="mt-6 pt-6 border-t relative group">
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-10 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={async () => {
                  const success = await copyToClipboard(answer);
                  if (success) toast.success("Code copied");
                  else toast.error("Failed to copy code");
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto text-sm font-mono mt-4">
                <code>{answer}</code>
              </pre>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
