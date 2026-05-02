'use client';

import React, { useState, useEffect } from 'react';
import AdmissionsHero from './AdmissionsHero';
import ApplicationForm from './ApplicationForm';
import AdmissionsSidebar from './AdmissionsSidebar';

export default function AdmissionsClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Persistence: Step
  useEffect(() => {
    const savedStep = localStorage.getItem('admissions_step');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admissions_step', currentStep.toString());
  }, [currentStep]);

  return (
    <>
      <AdmissionsHero currentStep={currentStep} />

      {/* Main Content Grid */}
      <section className="relative w-full py-12 md:py-20 -mt-8 md:-mt-12 z-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Form Column */}
            <div className="lg:col-span-8 w-full">
              <ApplicationForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 w-full">
              <AdmissionsSidebar isSubmitted={isSubmitted} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
