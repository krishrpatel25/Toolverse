import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel(
      { model: 'gemini-1.5-flash' },
      { apiVersion: 'v1' }
    );

    let finalPrompt = prompt;
    if (type === 'summary') {
      finalPrompt = `Please summarize the following text concisely:\n\n${prompt}`;
    } else if (type === 'grammar') {
      finalPrompt = `Please check the following text for grammar and spelling errors. Provide corrections:\n\n${prompt}`;
    } else if (type === 'code') {
      finalPrompt = `Please help me with this coding task:\n\n${prompt}`;
    }

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      data: {
        text,
      },
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate content',
      },
      { status: 500 }
    );
  }
}
