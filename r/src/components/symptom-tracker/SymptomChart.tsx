'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Legend } from 'recharts';
import type { SymptomLog } from '@/lib/types';
import { format } from 'date-fns';

interface SymptomChartProps {
  symptomLogs: SymptomLog[];
}

const chartConfig = {
  severity: {
    label: 'Severity',
    color: 'hsl(var(--chart-1))',
  },
};

export default function SymptomChart({ symptomLogs }: SymptomChartProps) {
  if (symptomLogs.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No symptom data to display. Add some logs to see the chart.</p>;
  }

  const chartData = symptomLogs
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Ensure data is sorted by date
    .map(log => ({
      date: format(new Date(log.date), 'MMM d'),
      severity: log.severity,
      tooltipSymptoms: log.symptoms, // For custom tooltip
    }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 10]}
          allowDecimals={false}
          ticks={[0, 2, 4, 6, 8, 10]}
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              labelKey="severity"
              nameKey="Symptoms"
              indicator="line"
              formatter={(value, name, props) => (
                <div className="text-sm">
                  <div className="font-medium">{props.payload.tooltipSymptoms}</div>
                  <div>Severity: {value} on {props.payload.date}</div>
                </div>
              )}
            />
          }
        />
        <Line
          dataKey="severity"
          type="monotone"
          stroke="var(--color-severity)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-severity)",
            r: 4,
          }}
          activeDot={{
            r: 6,
          }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
