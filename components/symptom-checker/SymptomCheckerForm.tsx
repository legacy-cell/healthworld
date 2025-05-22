'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import type { AISymptomCheckerInput } from '@/ai/flows/ai-symptom-checker';

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: 'Symptoms must be at least 10 characters.',
  }),
  patientHistory: z.string().optional(),
});

type SymptomCheckerFormValues = z.infer<typeof formSchema>;

interface SymptomCheckerFormProps {
  onSubmit: (data: AISymptomCheckerInput) => Promise<void>;
  isLoading: boolean;
}

export default function SymptomCheckerForm({ onSubmit, isLoading }: SymptomCheckerFormProps) {
  const form = useForm<SymptomCheckerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      patientHistory: '',
    },
  });

  async function handleFormSubmit(values: SymptomCheckerFormValues) {
    await onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symptoms</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your symptoms in detail (e.g., fever, cough, headache for 3 days)"
                  className="min-h-[120px] resize-y"
                  {...field}
                  aria-describedby="symptoms-help"
                />
              </FormControl>
              <p id="symptoms-help" className="text-sm text-muted-foreground">
                Please provide as much detail as possible about what you are experiencing.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patientHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient History (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Include any relevant medical history, existing conditions, or medications"
                  className="min-h-[100px] resize-y"
                  {...field}
                  aria-describedby="history-help"
                />
              </FormControl>
              <p id="history-help" className="text-sm text-muted-foreground">
                This information can help provide a more accurate assessment.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking Symptoms...
            </>
          ) : (
            'Check Symptoms'
          )}
        </Button>
      </form>
    </Form>
  );
}
