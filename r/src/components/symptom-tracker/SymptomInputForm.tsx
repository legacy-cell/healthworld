'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import type { SymptomLog } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const symptomFormSchema = z.object({
  date: z.date({
    required_error: "A date for the symptom log is required.",
  }),
  symptoms: z.string().min(3, {
    message: 'Symptoms description must be at least 3 characters.',
  }),
  severity: z.number().min(1).max(10),
  notes: z.string().optional(),
});

type SymptomFormValues = z.infer<typeof symptomFormSchema>;

interface SymptomInputFormProps {
  onAddSymptom: (symptom: Omit<SymptomLog, 'id'>) => void;
}

export default function SymptomInputForm({ onAddSymptom }: SymptomInputFormProps) {
  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(symptomFormSchema),
    defaultValues: {
      date: new Date(),
      symptoms: '',
      severity: 5,
      notes: '',
    },
  });

  function handleSubmit(values: SymptomFormValues) {
    onAddSymptom({
      ...values,
      date: values.date.toISOString(),
    });
    form.reset({ date: new Date(), symptoms: '', severity: 5, notes: ''});
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symptoms</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Headache, fatigue" {...field} />
              </FormControl>
              <FormDescription>
                Briefly describe the main symptoms you experienced.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Severity (1-10)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                   <Slider
                    defaultValue={[field.value]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="flex-grow"
                  />
                  <span className="w-8 text-center font-medium">{field.value}</span>
                </div>
              </FormControl>
              <FormDescription>
                Rate the overall severity of your symptoms, where 1 is mild and 10 is severe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional details, triggers, or relief measures."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto">Add Symptom Log</Button>
      </form>
    </Form>
  );
}
