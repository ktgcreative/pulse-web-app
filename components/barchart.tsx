"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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

// Example GSC data representing CTR growth for specific search queries from January to June
const chartData = [
  { month: "January", ctr: 0.02 },
  { month: "February", ctr: 0.03 },
  { month: "March", ctr: 0.045 },
  { month: "April", ctr: 0.04 },
  { month: "May", ctr: 0.05 },
  { month: "June", ctr: 0.055 },
]

const chartConfig = {
  ctr: {
    label: "CTR",
    color: "red",
  },
} satisfies ChartConfig

export function Barchart() {
  const { theme } = useTheme()
  const barColor = theme === "light" ? "#000000" : "teal"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Click-Through Rate (CTR) Growth</CardTitle>
        <CardDescription>CTR for Key Search Queries (January - June 2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} // Display as percentage
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="ctr" fill={barColor} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing CTR growth for key queries over the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
