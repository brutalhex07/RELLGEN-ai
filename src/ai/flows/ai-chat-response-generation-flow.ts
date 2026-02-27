'use server';
/**
 * @fileOverview A Genkit flow that generates an AI chat response based on a user's text prompt.
 *
 * - generateAiChatResponse - A function that handles the AI chat response generation process.
 * - AiChatResponseInput - The input type for the generateAiChatResponse function.
 * - AiChatResponseOutput - The return type for the generateAiChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatResponseInputSchema = z.object({
  prompt: z.string().describe('The user\'s text prompt or question.'),
});
export type AiChatResponseInput = z.infer<typeof AiChatResponseInputSchema>;

const AiChatResponseOutputSchema = z.object({
  response: z.string().describe('The AI\'s generated text response.'),
});
export type AiChatResponseOutput = z.infer<typeof AiChatResponseOutputSchema>;

const chatPrompt = ai.definePrompt({
  name: 'aiChatResponsePrompt',
  input: {schema: AiChatResponseInputSchema},
  output: {schema: AiChatResponseOutputSchema},
  prompt: `You are a helpful AI assistant. Respond to the user's prompt.

User: {{{prompt}}}`,
});

const aiChatResponseFlow = ai.defineFlow(
  {
    name: 'aiChatResponseFlow',
    inputSchema: AiChatResponseInputSchema,
    outputSchema: AiChatResponseOutputSchema,
  },
  async input => {
    const {output} = await chatPrompt(input);
    return output!;
  }
);

export async function generateAiChatResponse(
  input: AiChatResponseInput
): Promise<AiChatResponseOutput> {
  return aiChatResponseFlow(input);
}
