"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function JSONFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setIsValid(true);
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indent));

      setOutput(formatted);
      setIsValid(true);
      setError("");
    } catch (err) {
      setOutput(input);
      setIsValid(false);
      setError((err as Error).message);
    }
  }, [input, indent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleMinify = async () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      await navigator.clipboard.writeText(minified);
      toast.success("Minified & copied");
    } catch {
      toast.error("Invalid JSON");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(true);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Input JSON</label>

          <Textarea
            placeholder='{"example": "json"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[220px] resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Formatted Output</label>

          <Card className="border bg-secondary/30 p-3 min-h-[220px] overflow-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap break-words">
              {output || "Formatted JSON will appear here..."}
            </pre>
          </Card>
        </div>
      </div>

      {/* Validation */}
      {input && (
        <Card
          className={`border p-3 flex items-center gap-2 ${
            isValid
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          {isValid ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700">Valid JSON</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-700 break-all">{error}</span>
            </>
          )}
        </Card>
      )}

      {/* Indentation */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Indentation</label>

        <div className="flex flex-wrap gap-2">
          {["2", "4", "8"].map((spaces) => (
            <Button
              key={spaces}
              variant={indent === spaces ? "default" : "outline"}
              size="sm"
              onClick={() => setIndent(spaces)}
            >
              {spaces} Spaces
            </Button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={!input}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleMinify}
          disabled={!isValid || !input}
        >
          Minify & Copy
        </Button>

        <Button size="sm" onClick={handleCopy} disabled={!output}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Formatted
        </Button>
      </div>
    </div>
  );
}
