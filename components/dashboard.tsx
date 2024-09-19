"use client"

import { TrendingUp } from "lucide-react"
import { Area, Line, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useTheme } from "next-themes"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Example GSC data for impressions and CTR over 6 months
const chartData = [
  { month: "January", impressions: 1860, ctr: 0.05 },
  { month: "February", impressions: 1500, ctr: 0.04 },
  { month: "March", impressions: 2300, ctr: 0.045 },
  { month: "April", impressions: 1900, ctr: 0.03 },
  { month: "May", impressions: 2000, ctr: 0.035 },
  { month: "June", impressions: 2100, ctr: 0.04 },
]

// Config for the chart, reflecting impressions and CTR
const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "teal",
  },
  ctr: {
    label: "CTR",
    color: "cyan",
  },
} satisfies ChartConfig

export function Component() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lost Users - GSC Metrics</CardTitle>
        <CardDescription>Tracking impressions and CTR decline for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* Y-Axis for Impressions */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "Impressions", angle: -90, position: "insideLeft" }}
            />
            {/* Y-Axis for CTR */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "CTR (%)", angle: -90, position: "insideRight" }}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {/* Area chart for Impressions */}
            <Area
              yAxisId="left"
              dataKey="impressions"
              type="natural"
              fill="url(#fillImpressions)"
              fillOpacity={0.4}
              stroke={chartColor}
              stackId="a"
            />
            {/* Line chart for CTR */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="ctr"
              stroke="cyan"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
