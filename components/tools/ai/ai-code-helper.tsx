"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AICodeHelper() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generate = () => {
    const code = `Example code for: ${question}

function example(){
 console.log("Hello World");
}`;

    setAnswer(code);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">AI Code Helper</h2>

      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Button onClick={generate}>Generate</Button>

      {answer && <pre>{answer}</pre>}
    </Card>
  );
}
