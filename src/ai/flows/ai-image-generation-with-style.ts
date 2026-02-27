'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating images from text prompts with specified artistic styles.
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
      const {media} = await ai.generate({
        model: 'googleai/imagen-3',
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

      if (!media || !media.url) {
        throw new Error('The image generation model did not return a valid result. This could be due to safety filters or service availability.');
      }

      return {
        imageUrl: media.url,
      };
    } catch (error: any) {
      console.error("Genkit Image Generation Error:", error);
      throw new Error(error.message || "Failed to generate image.");
    }
  }
);
