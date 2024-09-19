"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useTheme } from "next-themes"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Fake data representing Search Console impressions over time
const chartData = [
  { date: "2024-09-15", desktop: 390, mobile: 82 },
  { date: "2024-09-14", desktop: 207, mobile: 373 },
  { date: "2024-09-13", desktop: 403, mobile: 222 },
  { date: "2024-09-12", desktop: 483, mobile: 432 },
  { date: "2024-09-11", desktop: 278, mobile: 357 },
  { date: "2024-09-10", desktop: 307, mobile: 142 },
  { date: "2024-09-09", desktop: 405, mobile: 98 },
  { date: "2024-09-08", desktop: 118, mobile: 159 },
  { date: "2024-09-07", desktop: 248, mobile: 175 },
  { date: "2024-09-06", desktop: 168, mobile: 413 },
  { date: "2024-09-05", desktop: 140, mobile: 274 },
  { date: "2024-09-04", desktop: 396, mobile: 198 },
  { date: "2024-09-03", desktop: 293, mobile: 316 },
  { date: "2024-09-02", desktop: 459, mobile: 147 },
  { date: "2024-09-01", desktop: 441, mobile: 426 },
  { date: "2024-08-31", desktop: 240, mobile: 429 },
  { date: "2024-08-30", desktop: 377, mobile: 212 },
  { date: "2024-08-29", desktop: 413, mobile: 400 },
  { date: "2024-08-28", desktop: 282, mobile: 190 },
  { date: "2024-08-27", desktop: 456, mobile: 252 },
  { date: "2024-08-26", desktop: 185, mobile: 376 },
  { date: "2024-08-25", desktop: 409, mobile: 307 },
  { date: "2024-08-24", desktop: 367, mobile: 430 },
  { date: "2024-08-23", desktop: 218, mobile: 112 },
  { date: "2024-08-22", desktop: 249, mobile: 352 },
  { date: "2024-08-21", desktop: 238, mobile: 235 },
  { date: "2024-08-20", desktop: 301, mobile: 114 },
  { date: "2024-08-19", desktop: 448, mobile: 300 },
  { date: "2024-08-18", desktop: 140, mobile: 123 },
  { date: "2024-08-17", desktop: 345, mobile: 186 },
  { date: "2024-08-16", desktop: 482, mobile: 445 },
  { date: "2024-08-15", desktop: 389, mobile: 278 },
  { date: "2024-08-14", desktop: 259, mobile: 180 },
  { date: "2024-08-13", desktop: 332, mobile: 333 },
  { date: "2024-08-12", desktop: 462, mobile: 103 },
  { date: "2024-08-11", desktop: 471, mobile: 159 },
  { date: "2024-08-10", desktop: 341, mobile: 308 },
  { date: "2024-08-09", desktop: 267, mobile: 97 },
  { date: "2024-08-08", desktop: 364, mobile: 224 },
  { date: "2024-08-07", desktop: 450, mobile: 340 },
  { date: "2024-08-06", desktop: 186, mobile: 131 },
  { date: "2024-08-05", desktop: 472, mobile: 389 },
  { date: "2024-08-04", desktop: 165, mobile: 255 },
  { date: "2024-08-03", desktop: 268, mobile: 345 },
  { date: "2024-08-02", desktop: 311, mobile: 218 },
  { date: "2024-08-01", desktop: 205, mobile: 108 },
  { date: "2024-07-31", desktop: 128, mobile: 341 },
  { date: "2024-07-30", desktop: 473, mobile: 225 },
  { date: "2024-07-29", desktop: 212, mobile: 221 },
  { date: "2024-07-28", desktop: 464, mobile: 90 },
  { date: "2024-07-27", desktop: 197, mobile: 123 },
  { date: "2024-07-26", desktop: 408, mobile: 249 },
  { date: "2024-07-25", desktop: 119, mobile: 308 },
  { date: "2024-07-24", desktop: 484, mobile: 202 },
  { date: "2024-07-23", desktop: 158, mobile: 293 },
  { date: "2024-07-22", desktop: 413, mobile: 405 },
  { date: "2024-07-21", desktop: 267, mobile: 413 },
  { date: "2024-07-20", desktop: 477, mobile: 263 },
  { date: "2024-07-19", desktop: 345, mobile: 232 },
  { date: "2024-07-18", desktop: 112, mobile: 101 },
  { date: "2024-07-17", desktop: 353, mobile: 343 },
  { date: "2024-07-16", desktop: 103, mobile: 94 },
  { date: "2024-07-15", desktop: 140, mobile: 376 },
  { date: "2024-07-14", desktop: 137, mobile: 303 },
  { date: "2024-07-13", desktop: 253, mobile: 226 },
  { date: "2024-07-12", desktop: 109, mobile: 371 },
  { date: "2024-07-11", desktop: 484, mobile: 292 },
  { date: "2024-07-10", desktop: 387, mobile: 406 },
  { date: "2024-07-09", desktop: 490, mobile: 207 },
  { date: "2024-07-08", desktop: 402, mobile: 332 },
  { date: "2024-07-07", desktop: 139, mobile: 439 },
  { date: "2024-07-06", desktop: 244, mobile: 191 },
  { date: "2024-07-05", desktop: 374, mobile: 298 },
  { date: "2024-07-04", desktop: 496, mobile: 187 },
  { date: "2024-07-03", desktop: 109, mobile: 288 },
  { date: "2024-07-02", desktop: 334, mobile: 105 },
  { date: "2024-07-01", desktop: 266, mobile: 235 },
  { date: "2024-06-30", desktop: 128, mobile: 101 },
  { date: "2024-06-29", desktop: 196, mobile: 160 },
  { date: "2024-06-28", desktop: 495, mobile: 432 },
  { date: "2024-06-27", desktop: 333, mobile: 407 },
  { date: "2024-06-26", desktop: 226, mobile: 168 },
  { date: "2024-06-25", desktop: 218, mobile: 233 },
  { date: "2024-06-24", desktop: 172, mobile: 312 },
  { date: "2024-06-23", desktop: 384, mobile: 411 },
  { date: "2024-06-22", desktop: 321, mobile: 199 },
]


const chartConfig = {
  impressions: {
    label: "Search Impressions",
  },
  desktop: {
    label: "Desktop",
    color: "teal",
  },
  mobile: {
    label: "Mobile",
    color: "teal",
  },
} satisfies ChartConfig

export function LongChart() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Search Console Impressions</CardTitle>
          <CardDescription>
            Showing impressions for the selected time range
          </CardDescription>
        </div>
        <div className="change-date">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[180px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke={chartColor}
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke={chartColor}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
