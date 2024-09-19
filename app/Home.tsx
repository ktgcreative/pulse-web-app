// pages/index.js
import { LineChart2 } from "@/components/LineChart2";
import Navbar from "@/components/Navbar";
import { Barchart } from "@/components/barchart";
import { Component } from "@/components/dashboard";
import { LongChart } from "@/components/longchart";
import { Radiar } from "@/components/radiarchart";
import { Roundbar } from "@/components/roundbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
     
     <Navbar />
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-24">
        <div className="col-span-1">
          <Component />
        </div>
        <div className="col-span-1">
          <Barchart />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Roundbar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <LongChart />
        </div>
        <div className="col-span-1 sm:col-span-2  lg:col-span-1">
          <Radiar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <LineChart2 />
        </div>
      </div>
    </main>
  );
}
