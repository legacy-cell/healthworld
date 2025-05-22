'use client';

import { useState, useEffect } from 'react';
import SymptomInputForm from '@/components/symptom-tracker/SymptomInputForm';
import SymptomChart from '@/components/symptom-tracker/SymptomChart';
import type { SymptomLog } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'healthworld_symptom_logs'; // Updated key prefix

export default function SymptomTrackerPage() {
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedLogs = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedLogs) {
        setSymptomLogs(JSON.parse(storedLogs));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(symptomLogs));
    }
  }, [symptomLogs, isClient]);

  const handleAddSymptom = (newLog: Omit<SymptomLog, 'id'>) => {
    setSymptomLogs(prevLogs => [
      ...prevLogs,
      { ...newLog, id: Date.now().toString() }, // Simple unique ID
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())); // Sort newest first
  };

  const handleDeleteSymptom = (id: string) => {
    setSymptomLogs(prevLogs => prevLogs.filter(log => log.id !== id));
  };

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen"><p>Loading symptom tracker...</p></div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Symptom Tracker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Log your symptoms over time and visualize your health trends.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Log New Symptom</CardTitle>
            <CardDescription>Fill in the details of your symptoms below.</CardDescription>
          </CardHeader>
          <CardContent>
            <SymptomInputForm onAddSymptom={handleAddSymptom} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Symptom Severity Over Time</CardTitle>
            <CardDescription>Interactive chart showing your logged symptom severities.</CardDescription>
          </CardHeader>
          <CardContent>
            <SymptomChart symptomLogs={symptomLogs} />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Symptom Log History</CardTitle>
          <CardDescription>A detailed list of all your logged symptoms.</CardDescription>
        </CardHeader>
        <CardContent>
          {symptomLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Symptoms</TableHead>
                  <TableHead className="text-center">Severity</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {symptomLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{format(new Date(log.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.symptoms}</TableCell>
                    <TableCell className="text-center">{log.severity}/10</TableCell>
                    <TableCell className="max-w-xs truncate">{log.notes || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSymptom(log.id)} aria-label="Delete log">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-4">No symptoms logged yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
