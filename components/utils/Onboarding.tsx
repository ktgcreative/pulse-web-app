/* eslint-disable react/jsx-key */
"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

// Main Onboarding Wizard Component
const OnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const numSteps = 4; // Total number of steps

  const handleSetStep = (num: -1 | 1) => {
    if ((currentStep === 0 && num === -1) || (currentStep === numSteps && num === 1)) {
      return;
    }
    setCurrentStep((prev) => prev + num);
  };

  const steps = [
    <GoogleSignInStep />,
    <PropertySelectionStep />,
    <GoalSelectionStep />,
    <ConfirmationStep />,
  ];

  return (
    <div className="px-4 py-14 bg-white">
      <div className="p-8 rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 rounded-3xl w-full max-w-2xl mx-auto">
        <Steps numSteps={numSteps} stepsComplete={currentStep} />
        <div className="p-2 my-6 h-48  border-gray-200 rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className="px-4 py-1 rounded hover:bg-gray-100 text-black"
            onClick={() => handleSetStep(-1)}
          >
            Prev
          </button>
          <button
            className="px-4 py-1 rounded bg-black text-white"
            onClick={() => handleSetStep(1)}
          >
            {currentStep === numSteps - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Steps progress component
const Steps = ({ numSteps, stepsComplete }: { numSteps: number; stepsComplete: number }) => {
  const stepArray = Array.from(Array(numSteps).keys());

  return (
    <div className="flex items-center justify-between gap-3">
      {stepArray.map((num) => {
        const stepNum = num + 1;
        const isActive = stepNum <= stepsComplete;
        return (
          <React.Fragment key={stepNum}>
            <Step num={stepNum} isActive={isActive} />
            {stepNum !== stepArray.length && (
              <div className="w-full h-1 rounded-full bg-gray-200 relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-cyan-600 rounded-full"
                  animate={{ width: isActive ? '100%' : 0 }}
                  transition={{ ease: 'easeIn', duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Step indicator component
const Step = ({ num, isActive }: { num: number; isActive: boolean }) => {
  return (
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-gray-300 text-gray-300'
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && <div className="absolute z-0 -inset-1.5 bg-cyan-100 rounded-full animate-pulse" />}
    </div>
  );
};

// Google Sign-In Step
const GoogleSignInStep: React.FC = () => {
  const handleGoogleSignIn = () => {
    // Add your Google Sign-In logic here
    console.log('Google Sign-In Clicked');
  };

  return (
    <div className='grid my-10 text-center justify-center '>
      <h2 className="text-xl font-semibold mb-4">Sign in with Google</h2>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FcGoogle className="mr-2" size={24} />
        Sign in with Google
      </button>
    </div>
  );
};

// Property Selection Step
const PropertySelectionStep: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('');

  const properties = ['Property 1', 'Property 2', 'Property 3'];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Your Property</h2>
      <select
        className="w-full p-2 border rounded"
        value={selectedProperty}
        onChange={(e) => setSelectedProperty(e.target.value)}
      >
        <option value="" disabled>
          Select a property
        </option>
        {properties.map((property) => (
          <option key={property} value={property}>
            {property}
          </option>
        ))}
      </select>
    </div>
  );
};

// Goal Selection Step
const GoalSelectionStep: React.FC = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = ['Increase Traffic', 'Improve SEO', 'Boost Conversions', 'Enhance User Engagement'];

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal) ? prevGoals.filter((g) => g !== goal) : [...prevGoals, goal]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Your Goals</h2>
      <div className="space-y-2">
        {goals.map((goal) => (
          <label key={goal} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedGoals.includes(goal)}
              onChange={() => toggleGoal(goal)}
              className="mr-2"
            />
            {goal}
          </label>
        ))}
      </div>
    </div>
  );
};

// Confirmation Step
const ConfirmationStep: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Your Details</h2>
      <p>Review your selections before proceeding.</p>
      {/* You can display the selected property and goals here */}
    </div>
  );
};

export default OnboardingWizard;
