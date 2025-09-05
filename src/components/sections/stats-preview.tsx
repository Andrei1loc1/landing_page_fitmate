"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", steps: 8500 },
  { day: "Tue", steps: 10200 },
  { day: "Wed", steps: 7800 },
  { day: "Thu", steps: 12300 },
  { day: "Fri", steps: 9800 },
  { day: "Sat", steps: 15500 },
  { day: "Sun", steps: 6400 },
];

const chartConfig = {
  steps: {
    label: "Steps",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function StatsPreview() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Visualize Your Progress
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our intuitive charts help you see your achievements at a glance and
            stay on track.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Step Count</CardTitle>
            <CardDescription>
              Here's a look at your activity this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <ChartTooltip
                    cursor={{ fill: "hsl(var(--accent))", opacity: 0.2 }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
