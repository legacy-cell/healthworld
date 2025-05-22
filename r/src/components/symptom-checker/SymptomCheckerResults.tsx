import type { AISymptomCheckerOutput } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldAlert, Lightbulb, ListChecks } from 'lucide-react';

interface SymptomCheckerResultsProps {
  results: AISymptomCheckerOutput;
}

export default function SymptomCheckerResults({ results }: SymptomCheckerResultsProps) {
  return (
    <div className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            Possible Conditions
          </CardTitle>
          <CardDescription>
            Based on the symptoms you provided, here are some potential conditions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.possibleConditions.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5">
              {results.possibleConditions.map((condition, index) => (
                <li key={index} className="text-base">
                  {condition}
                </li>
              ))}
            </ul>
          ) : (
            <p>No specific conditions identified based on the input. Please ensure your symptoms are described clearly.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Reasoning
          </CardTitle>
          <CardDescription>
            Explanation behind the potential conditions listed above.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>View Detailed Reasoning</AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-wrap text-base">{results.reasoning || "No specific reasoning provided."}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Alert variant="destructive">
        <ShieldAlert className="h-5 w-5" />
        <AlertTitle>Important Disclaimer</AlertTitle>
        <AlertDescription className="text-base">
          {results.disclaimer}
        </AlertDescription>
      </Alert>
    </div>
  );
}
