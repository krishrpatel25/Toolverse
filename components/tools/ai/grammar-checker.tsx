"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function GrammarChecker() {
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<string[]>([]);

  const check = () => {
    const errors: string[] = [];

    if (text.includes("  ")) errors.push("Multiple spaces detected");

    if (!/[.!?]$/.test(text)) errors.push("Missing punctuation");

    setIssues(errors.length ? errors : ["No issues found"]);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">AI Grammar Checker</h2>

      <Textarea value={text} onChange={(e) => setText(e.target.value)} />

      <Button onClick={check}>Check Grammar</Button>

      {issues.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
    </Card>
  );
}
