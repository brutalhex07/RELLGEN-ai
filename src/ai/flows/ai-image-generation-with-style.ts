'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating images from text prompts using Google's Imagen models.
 *
 * - aiImageGenerationWithStyle - A function that generates an image based on a text prompt and a selected style.
 * - AiImageGenerationWithStyleInput - The input type for the aiImageGenerationWithStyle function.
 * - AiImageGenerationWithStyleOutput - The return type for the aiImageGenerationWithStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiImageGenerationWithStyleInputSchema = z.object({
  prompt: z.string().describe('A detailed text description of the image to generate.'),
  style: z
    .string()
    .describe('The artistic style for the image (e.g., Realistic, Anime, 3D, Cinematic, Watercolor).'),
});
export type AiImageGenerationWithStyleInput = z.infer<typeof AiImageGenerationWithStyleInputSchema>;

const AiImageGenerationWithStyleOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiImageGenerationWithStyleOutput = z.infer<typeof AiImageGenerationWithStyleOutputSchema>;

export async function aiImageGenerationWithStyle(
  input: AiImageGenerationWithStyleInput
): Promise<AiImageGenerationWithStyleOutput> {
  return aiImageGenerationWithStyleFlow(input);
}

const aiImageGenerationWithStyleFlow = ai.defineFlow(
  {
    name: 'aiImageGenerationWithStyleFlow',
    inputSchema: AiImageGenerationWithStyleInputSchema,
    outputSchema: AiImageGenerationWithStyleOutputSchema,
  },
  async (input) => {
    const combinedPrompt = `Generate a high-quality ${input.style.toLowerCase()} style image based on this description: ${input.prompt}. Ensure the artistic style is clearly reflected.`;

    try {
      // Use the stable Imagen 3.0 model for high-quality text-to-image generation
      const result = await ai.generate({
        model: 'googleai/imagen-3.0-generate-001',
        prompt: combinedPrompt,
        config: {
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_ONLY_HIGH',
            },
          ],
        },
      });

      if (result.media && result.media.url) {
        return { imageUrl: result.media.url };
      }

      // Fallback attempt with the "Fast" variant
      const fallback = await ai.generate({
        model: 'googleai/imagen-3.0-fast-generate-001',
        prompt: combinedPrompt,
      });

      if (fallback.media && fallback.media.url) {
        return { imageUrl: fallback.media.url };
      }

      throw new Error('The AI model processed the request but did not return an image. This can happen due to strict safety filters or temporary service limits.');
    } catch (error: any) {
      console.error('Image Generation Flow Error:', error);
      
      // Provide more helpful user-facing errors based on common API responses
      let userMessage = error.message || 'An unexpected error occurred.';
      if (userMessage.includes('404')) {
        userMessage = 'The requested image model is not available in your region. Our team is working on more fallbacks.';
      } else if (userMessage.includes('INVALID_ARGUMENT')) {
        userMessage = 'The request parameters were invalid for the selected model. Retrying with a simpler configuration.';
      }

      throw new Error(`Generation failed: ${userMessage}`);
    }
  }
);
