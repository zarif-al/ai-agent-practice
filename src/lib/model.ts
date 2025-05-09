import 'server-only';

import { createOllama } from 'ollama-ai-provider';

const OLLAMA_MODEL_NAME = process.env.OLLAMA_MODEL_NAME;
const OLLAMA_API_ENDPOINT = process.env.OLLAMA_API_ENDPOINT;

if (!OLLAMA_API_ENDPOINT) {
  throw new Error('OLLAMA_API_ENDPOINT environment variable is not set');
}

if (!OLLAMA_MODEL_NAME) {
  throw new Error('OLLAMA_MODEL_NAME environment variable is not set');
}

const ollama = createOllama({
  baseURL: OLLAMA_API_ENDPOINT,
});

export const ollamaModel = ollama(OLLAMA_MODEL_NAME, {
  simulateStreaming: true,
});
