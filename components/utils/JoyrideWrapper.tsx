"use client";
import React, { useState, createContext, useContext } from 'react';
import dynamic from 'next/dynamic';
import { Step, CallBackProps, STATUS, TooltipRenderProps } from 'react-joyride';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Dynamically import react-joyride to prevent SSR issues
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

// Utility function to check if an element is in the viewport
const isElementInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Define button styles
const buttonStyles = {
  close: "absolute right-2 top-2 text-gray-400 hover:text-gray-600",
  back: "flex items-center text-sm text-blue-600 hover:text-blue-700",
  primary: "flex items-center rounded-3xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700",
};

// Custom Tooltip component
const CustomTooltip: React.FC<TooltipRenderProps> = ({
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  isLastStep,
}) => (
  <div {...tooltipProps} className="relative rounded-lg bg-white p-4 shadow-xl max-w-sm">
    <button {...closeProps} className={buttonStyles.close} aria-label="Close">
      <FiX className="h-5 w-5" />
    </button>
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{step.title}</h2>
      <p className="mt-1 text-sm text-gray-600">{step.content}</p>
    </div>
    <div className="flex justify-between">
      {index > 0 && (
        <button {...backProps} className={buttonStyles.back}>
          <FiChevronLeft className="mr-1 h-4 w-4" />
          Back
        </button>
      )}
      <button {...primaryProps} className={buttonStyles.primary}>
        {isLastStep ? 'Finish' : 'Next'}
        <FiChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  </div>
);

// Define the context value interface
interface JoyrideContextValue {
  startTour: () => void;
}

// Create a Context for Joyride
const JoyrideContext = createContext<JoyrideContextValue | undefined>(undefined);

// Custom hook to use the Joyride context
export const useJoyride = () => {
  const context = useContext(JoyrideContext);
  if (!context) {
    throw new Error('useJoyride must be used within a JoyrideWrapper');
  }
  return context;
};

// Define props for JoyrideWrapper
interface JoyrideWrapperProps {
  steps: Step[];
  children: React.ReactNode;
}

// JoyrideWrapper component
const JoyrideWrapper: React.FC<JoyrideWrapperProps> = ({ steps, children }) => {
  const [runTour, setRunTour] = useState(false);

  // Function to start the tour
  const startTour = () => {
    setRunTour(true);
  };

  // Handle Joyride callbacks and disable scroll if element is in view
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, step } = data;

    // Check if the step target element is in the viewport
    const element = document.querySelector(step.target as string) as HTMLElement;
    if (element && isElementInViewport(element)) {
      // If element is in view, prevent scroll
      data.lifecycle = 'tooltip';
    }

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
    }
  };

  return (
    <JoyrideContext.Provider value={{ startTour }}>
      <>
        <Joyride
          steps={steps}
          run={runTour}
          continuous
          showSkipButton
          showProgress
          disableOverlayClose
          disableCloseOnEsc
          scrollToFirstStep={false}  // Disable automatic scrolling
 // Control scrolling manually
          spotlightPadding={10}
          styles={{
            options: {
              arrowColor: '#ffffff',
              backgroundColor: '#ffffff',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              primaryColor: '#3B82F6',
              textColor: '#1F2937',
              zIndex: 10000,
            },
          }}
          callback={handleJoyrideCallback}
          tooltipComponent={CustomTooltip}
        />
        {children}
      </>
    </JoyrideContext.Provider>
  );
};

export default JoyrideWrapper;
