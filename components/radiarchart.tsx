"use client"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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

// Fake data representing top marketing keywords for Queenstown holidays in the last 6 months
const chartData = [
  { month: "January", keyword: "Adventure Tourism", searches: 3200 },
  { month: "February", keyword: "Luxury Stays", searches: 2900 },
  { month: "March", keyword: "Family Holidays", searches: 2700 },
  { month: "April", keyword: "Winter Sports", searches: 3500 },
  { month: "May", keyword: "Outdoor Activities", searches: 3800 },
  { month: "June", keyword: "Scenic Tours", searches: 4100 },
]

const chartConfig = {
  searches: {
    label: "Keyword Searches",
    color: "teal",
  },
} satisfies ChartConfig

export function Radiar() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Queenstown Marketing Keywords</CardTitle>
        <CardDescription>
          Popular search terms related to Queenstown tourism for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="keyword" />
            <PolarGrid />
            <Radar
              dataKey="searches"
              fill={chartColor}
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
