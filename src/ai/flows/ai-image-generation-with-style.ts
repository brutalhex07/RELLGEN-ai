'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating images from text prompts using Gemini/Imagen models.
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
      // Primary attempt using Gemini 2.0 Flash which supports multimodal image generation
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: combinedPrompt,
        config: {
          responseModalities: ['IMAGE'],
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

      if (media && media.url) {
        return { imageUrl: media.url };
      }

      // Fallback 1: Imagen 3.0 Generate (Standard stable)
      const fallback1 = await ai.generate({
        model: 'googleai/imagen-3.0-generate-001',
        prompt: combinedPrompt,
      });

      if (fallback1.media && fallback1.media.url) {
        return { imageUrl: fallback1.media.url };
      }

      // Fallback 2: Imagen 3.0 Fast
      const fallback2 = await ai.generate({
        model: 'googleai/imagen-3.0-fast-generate-001',
        prompt: combinedPrompt,
      });

      if (fallback2.media && fallback2.media.url) {
        return { imageUrl: fallback2.media.url };
      }

      throw new Error('No image was returned from any of the available models.');
    } catch (error: any) {
      console.error('Image Generation Error:', error);
      throw new Error(
        error.message?.includes('404') 
          ? 'The requested AI model is not available in your region. Please try again in a few moments.' 
          : `Generation failed: ${error.message}`
      );
    }
  }
);
