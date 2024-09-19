"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"
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

// Example data representing visitors by geographic region for the last 6 months
const baseChartData = [
  { region: "Queenstown", visitors: 3200 },
  { region: "Wanaka", visitors: 2750 },
  { region: "Dunedin", visitors: 1900 },
  { region: "Cromwell", visitors: 1200 },
  // { region: "", visitors: 850 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  northAmerica: {
    label: "North America",
    color: "teal",
  },
  europe: {
    label: "Europe",
    color: "teal",
  },
  asia: {
    label: "Asia",
    color: "teal",
  },
  southAmerica: {
    label: "South America",
    color: "teal",
  },
  africa: {
    label: "Africa",
    color: "teal",
  },
} satisfies ChartConfig

export function Roundbar() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  const chartData = baseChartData.map(item => ({
    ...item,
    fill: chartColor,
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Geographic Usage</CardTitle>
        <CardDescription>Visitors by Region (January - June 2024)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="region" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="region"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors by region for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
