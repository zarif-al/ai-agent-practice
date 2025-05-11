import 'server-only';

import { createOllama } from 'ollama-ai-provider';
import type { LanguageModelV1 } from 'ai';
import { google } from '@ai-sdk/google';

export function model(type: 'ollama' | 'google'): LanguageModelV1 {
  switch (type) {
    case 'ollama':
      const ollama = createOllama({
        baseURL: 'http://10.0.0.100:11434/api',
      });

      return ollama('qwen2.5-coder:14b', {
        simulateStreaming: true,
      });
    case 'google':
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

      if (!GOOGLE_API_KEY) {
        throw new Error('GOOGLE_API_KEY environment variable is not set');
      }

      return google('gemini-1.5-pro-latest');
    default:
      throw new Error(`Unknown model type: ${type}`);
  }
}
