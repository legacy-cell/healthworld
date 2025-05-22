import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Watch, Zap } from 'lucide-react';
import Image from 'next/image';

export default function WearablesPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Wearable Device Integration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect your health tracking devices to HealthWorld.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Sync Your Health Data</CardTitle>
          <CardDescription>
            Automatically import your health data from popular wearable devices to get a more holistic view of your well-being within HealthWorld.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-secondary/50 rounded-lg">
            <Image 
              src="https://placehold.co/300x200.png" 
              alt="Wearable devices" 
              width={300} 
              height={200} 
              className="rounded-md"
              data-ai-hint="smartwatch fitness tracker"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
              <p className="text-muted-foreground mb-4">
                We are working hard to bring you seamless integration with a variety of wearable health trackers and smartwatches. 
                This feature will allow you to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Automatically log activity levels and sleep patterns.</li>
                <li>Track heart rate, SpO2, and other vital signs.</li>
                <li>Correlate wearable data with your manually logged symptoms.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Supported Device Types (Planned)</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 p-3 border rounded-md bg-card">
                <Watch className="h-6 w-6 text-primary" />
                <span>Smartwatches</span>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-md bg-card">
                <Smartphone className="h-6 w-6 text-primary" />
                <span>Fitness Trackers</span>
              </div>
               <div className="flex items-center gap-2 p-3 border rounded-md bg-card">
                <Zap className="h-6 w-6 text-primary" />
                <span>Other Health Monitors</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Stay tuned for updates on supported brands and integration availability.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
