'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function GPACalculator() {
  const [courses, setCourses] = useState([
    { grade: 'A', credits: 3 },
    { grade: 'B', credits: 4 },
  ]);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  const calculateGPA = () => {
    if (courses.length === 0) return '0.00';
    const totalPoints = courses.reduce((sum, course) => {
      const points = (gradePoints[course.grade] || 0) * course.credits;
      return sum + points;
    }, 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const addCourse = () => {
    setCourses([...courses, { grade: 'A', credits: 3 }]);
  };

  const updateCourse = (index: number, field: string, value: any) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">GPA Calculator</h2>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {courses.map((course, index) => (
            <div key={index} className="flex gap-2 items-end">
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {Object.keys(gradePoints).map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <input
                type="number"
                value={course.credits}
                onChange={(e) => updateCourse(index, 'credits', parseInt(e.target.value) || 0)}
                min="1"
                max="4"
                className="w-20 px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Credits"
              />
              <button
                onClick={() => removeCourse(index)}
                className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <Button onClick={addCourse} className="w-full mt-4" variant="outline">
          Add Course
        </Button>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Your GPA</h3>
        <div className="text-4xl font-bold text-accent text-center mb-4">{calculateGPA()}</div>
        <div className="text-center text-sm text-muted-foreground">
          Based on {courses.length} course{courses.length !== 1 ? 's' : ''}
        </div>
      </Card>
    </div>
  );
}
