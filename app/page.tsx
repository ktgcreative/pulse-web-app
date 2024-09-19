// app/page.tsx
"use client"; // This ensures the component is a Client Component
import React from 'react';
import { FiHelpCircle } from 'react-icons/fi'; // Import the icon for the button
import { LineChart2 } from '@/components/LineChart2';
import { Barchart } from '@/components/barchart';
import { Component } from '@/components/dashboard';
import { LongChart } from '@/components/longchart';
import { Radiar } from '@/components/radiarchart';
import { Roundbar } from '@/components/roundbar';
import JoyrideWrapper, { useJoyride } from '@/components/utils/JoyrideWrapper';
import { Step } from 'react-joyride';
import OnboardingWizard from '@/components/utils/Onboarding';

const steps: Step[] = [
  {
    target: '.navbar',
    content: 'This is the navigation bar, containing links to different sections of the platform.',
    title: 'Navigation',
  },
  {
    target: '.component',
    content: 'Shows key metrics based on Google Search Console data.',
    title: 'Lost Users - GSC Metrics',

  },
  {
    target: '.barchart',
    content: 'Displays CTR growth for key search queries over time.',
    title: 'CTR Growth',
  },
  {
    target: '.roundbar',
    content: 'Shows visitor distribution by region.',
    title: 'Geographic Usage',
    placement: 'top',
  },
  {
    target: '.longchart',
    content: 'Displays impressions from Google Search Console, segmented by device.',
    title: 'Search Console Impressions',
    placement: 'left',
  },
  {
    target: '.change-date',
    content: 'Use this option to modify the date range and view data for different periods. Select a custom range to analyze specific trends.',
    title: 'Modify Date Range',
    placement: 'left',
  },  
  {
    target: '.radiar',
    content: 'Highlights popular search terms related to Queenstown tourism.',
    title: 'Marketing Keywords',
    placement: 'right',
  },
  {
    target: '.linechart',
    content: 'Breakdown of user traffic by device type.',
    title: 'User Traffic by Device',
    placement: 'bottom',
  },
];

// Main Home component
const Home: React.FC = () => {
  const { startTour } = useJoyride();

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      {/* <Navbar /> */}

      {/* Tour Start Button as an Icon in the Bottom Right Corner */}
      <button
        onClick={startTour}
        className="fixed bottom-5 z-50 right-5 animate-bounce bg-cyan-600 text-white p-3 rounded-full hover:bg-blue-600 shadow-lg transition-colors"
        aria-label="Start Tour"
      >
         <FiHelpCircle className="h-8 w-8" />
      </button>

      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-24">
        <div className="col-span-1 component">
          <Component />
        </div>
        <div className="col-span-1 barchart">
          <Barchart />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 roundbar">
          <Roundbar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 longchart">
          <LongChart />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 radiar">
          <Radiar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 linechart">
          <LineChart2 />
        </div>
      </div>
    </main>
  );
};

// Wrap Home with JoyrideWrapper
const App: React.FC = () => {
  return (
    <JoyrideWrapper steps={steps}>
      <Home />
      <OnboardingWizard />
    </JoyrideWrapper>
  );
};

export default App;
