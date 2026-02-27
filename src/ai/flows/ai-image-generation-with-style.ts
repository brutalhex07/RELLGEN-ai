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
import {googleAI} from '@genkit-ai/google-genai';

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
    const combinedPrompt = `Generate a ${input.style.toLowerCase()} image of: ${input.prompt}`;

    const {media} = await ai.generate({
      model: googleAI.model('imagen-4.0-fast-generate-001'), // Using Imagen 4 for text-to-image
      prompt: combinedPrompt,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image or image URL is missing.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
