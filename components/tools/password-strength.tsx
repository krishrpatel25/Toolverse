'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

export function PasswordStrength() {
  const [password, setPassword] = useState('');

  const checkStrength = () => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  };

  const { checks, score } = checkStrength();

  const getStrengthLabel = () => {
    if (password.length === 0) return 'Enter a password';
    if (score <= 1) return 'Very Weak';
    if (score === 2) return 'Weak';
    if (score === 3) return 'Fair';
    if (score === 4) return 'Good';
    return 'Very Strong';
  };

  const getStrengthColor = () => {
    if (password.length === 0) return 'bg-gray-500';
    if (score <= 1) return 'bg-red-500';
    if (score === 2) return 'bg-orange-500';
    if (score === 3) return 'bg-yellow-500';
    if (score === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Password Strength Checker</h2>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Enter Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Type password here..."
          />
        </div>
      </Card>

      {password.length > 0 && (
        <>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Strength Indicator</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Strength:</span>
                <span className={`text-sm font-semibold ${
                  score <= 1 ? 'text-red-500' :
                  score === 2 ? 'text-orange-500' :
                  score === 3 ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {getStrengthLabel()}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${getStrengthColor()}`}
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                {checks.length ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className="text-muted-foreground">At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.uppercase ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className="text-muted-foreground">Uppercase letter (A-Z)</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.lowercase ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className="text-muted-foreground">Lowercase letter (a-z)</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.numbers ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className="text-muted-foreground">Number (0-9)</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.special ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                <span className="text-muted-foreground">Special character (!@#$%^&*)</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
