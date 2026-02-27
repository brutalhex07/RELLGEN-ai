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
    const combinedPrompt = `Generate a high-quality ${input.style.toLowerCase()} style image: ${input.prompt}. Ensure the artistic style is clearly reflected.`;

    // Priority list of model identifiers to try
    const modelIds = [
      'googleai/imagen-3.0-generate-001',
      'googleai/imagen-3.0-fast-generate-001',
      'googleai/imagen-3',
    ];

    let lastErrorMessage = '';

    for (const modelId of modelIds) {
      try {
        const result = await ai.generate({
          model: modelId,
          prompt: combinedPrompt,
          config: {
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_NONE',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_NONE',
              },
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_NONE',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_NONE',
              },
            ],
          },
        });

        if (result.media && result.media.url) {
          return { imageUrl: result.media.url };
        }
      } catch (error: any) {
        lastErrorMessage = error.message;
        // If the error indicates the model is not found or available, try the next one
        if (
          error.message.includes('404') || 
          error.message.includes('not found') || 
          error.message.includes('not available') ||
          error.message.includes('INVALID_ARGUMENT')
        ) {
          continue;
        }
        // If it's a different error, we'll still try the next model just in case
        continue;
      }
    }

    throw new Error(`Image generation failed across all available models. Last error: ${lastErrorMessage}`);
  }
);
