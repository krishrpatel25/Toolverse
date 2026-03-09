'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function PasswordGenerator() {
  const [length, setLength] = useState('16');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generatePassword = useMemo(() => {
    return () => {
      let chars = '';
      if (includeLowercase) chars += LOWERCASE;
      if (includeUppercase) chars += UPPERCASE;
      if (includeNumbers) chars += NUMBERS;
      if (includeSymbols) chars += SYMBOLS;

      if (!chars) {
        toast.error('Select at least one character type');
        return '';
      }

      const len = Math.min(Math.max(parseInt(length) || 1, 1), 128);
      let password = '';

      for (let i = 0; i < len; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return password;
    };
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  const handleGenerate = () => {
    const pwd = generatePassword();
    if (pwd) {
      setPasswords([pwd, ...passwords.slice(0, 9)]);
    }
  };

  const handleCopy = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const calculateStrength = (pwd: string): { strength: string; color: string } => {
    let strength = 0;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    if (pwd.length >= 12) strength++;

    if (strength < 2) return { strength: 'Weak', color: 'text-red-600' };
    if (strength < 4) return { strength: 'Fair', color: 'text-yellow-600' };
    return { strength: 'Strong', color: 'text-green-600' };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Password Length: {length}</label>
        <Input
          type="range"
          min="4"
          max="128"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Characters to Include</label>
        <div className="space-y-2">
          {[
            { label: 'Lowercase (a-z)', value: includeLowercase, onChange: setIncludeLowercase },
            { label: 'Uppercase (A-Z)', value: includeUppercase, onChange: setIncludeUppercase },
            { label: 'Numbers (0-9)', value: includeNumbers, onChange: setIncludeNumbers },
            { label: 'Symbols (!@#$%...)', value: includeSymbols, onChange: setIncludeSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.value}
                onChange={(e) => opt.onChange(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button onClick={handleGenerate} size="lg" className="w-full">
        Generate Password
      </Button>

      {passwords.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Generated Passwords</h3>
          <div className="space-y-2">
            {passwords.map((password, index) => {
              const strength = calculateStrength(password);
              return (
                <Card
                  key={index}
                  className="border border-border bg-secondary/30 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm text-foreground break-all mb-1">
                      {showPassword ? password : '•'.repeat(password.length)}
                    </div>
                    <p className={`text-xs font-semibold ${strength.color}`}>
                      {strength.strength}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(password)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setPasswords([])}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
