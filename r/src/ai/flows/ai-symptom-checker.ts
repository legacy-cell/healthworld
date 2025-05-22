'use server';

/**
 * @fileOverview An AI symptom checker that offers possible conditions based on symptoms.
 *
 * - aiSymptomChecker - A function that handles the symptom checking process.
 * - AISymptomCheckerInput - The input type for the aiSymptomChecker function.
 * - AISymptomCheckerOutput - The return type for the aiSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A list of symptoms the user is experiencing.'),
  patientHistory: z
    .string()
    .optional()
    .describe('Optional: Additional patient history or context.'),
});

export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

const AISymptomCheckerOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe('A list of possible medical conditions based on the symptoms provided.'),
  reasoning: z
    .string()
    .describe('A brief explanation of the reasoning behind the possible conditions.'),
  disclaimer: z
    .string()
    .describe('A disclaimer that this is not a substitute for professional medical advice.'),
});

export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

export async function aiSymptomChecker(input: AISymptomCheckerInput): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {schema: AISymptomCheckerInputSchema},
  output: {schema: AISymptomCheckerOutputSchema},
  prompt: `You are a medical AI assistant that can provide a list of possible conditions based on the symptoms provided by the user.

Symptoms: {{{symptoms}}}
Patient History: {{{patientHistory}}}

Based on the symptoms, provide a list of possible medical conditions.
Explain your reasoning for each condition.
Include a disclaimer that this is not a substitute for professional medical advice.

Output the list of possible conditions and reasoning in a structured format.`,  
});

const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AISymptomCheckerInputSchema,
    outputSchema: AISymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      disclaimer: 'This information is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.',
    };
  }
);
