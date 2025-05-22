'use client';

import { useState, useEffect } from 'react';
import PrescriptionForm from '@/components/prescriptions/PrescriptionForm';
import type { Prescription } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

const LOCAL_STORAGE_KEY = 'healthworld_prescriptions';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedPrescriptions = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPrescriptions) {
        setPrescriptions(JSON.parse(storedPrescriptions));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prescriptions));
    }
  }, [prescriptions, isClient]);

  const handleAddPrescription = (newPrescriptionData: Omit<Prescription, 'id'>) => {
    setPrescriptions(prev => [
      ...prev,
      { ...newPrescriptionData, id: Date.now().toString() },
    ].sort((a,b) => new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime())); // Sort newest first
  };

  const handleDeletePrescription = (id: string) => {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
  };

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen"><p>Loading prescription records...</p></div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Prescription Records</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage and keep track of your medication prescriptions.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Add New Prescription</CardTitle>
            <CardDescription>Enter the details of a new prescription.</CardDescription>
          </CardHeader>
          <CardContent>
            <PrescriptionForm onSubmit={handleAddPrescription} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-8">
            <Image 
                src="https://placehold.co/600x300.png" 
                alt="Stylized prescription record" 
                width={600} 
                height={300} 
                className="rounded-lg shadow-md w-full object-cover"
                data-ai-hint="prescription medicine"
            />
            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Prescription History</CardTitle>
                <CardDescription>A detailed list of your logged prescriptions.</CardDescription>
            </CardHeader>
            <CardContent>
                {prescriptions.length > 0 ? (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date Issued</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {prescriptions.map(p => (
                        <TableRow key={p.id}>
                        <TableCell>{format(new Date(p.dateIssued), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="font-medium">{p.medicationName}</TableCell>
                        <TableCell>{p.dosage}</TableCell>
                        <TableCell>{p.frequency}</TableCell>
                        <TableCell>{p.doctorName}</TableCell>
                        <TableCell className="max-w-xs truncate">{p.notes || '-'}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleDeletePrescription(p.id)} aria-label="Delete prescription">
                            <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                ) : (
                <p className="text-center text-muted-foreground py-4">No prescriptions logged yet.</p>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
