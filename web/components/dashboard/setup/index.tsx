'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import SignIn from './signIn';
import SignUp from './signup';

const information = [
  {
    title: 'Sign In',
    description: 'Sign in to your account',
    component: SignIn,
  },
  {
    title: 'Sign Up',
    description: 'Create a new account',
    component: SignUp,
  },
];

const WelcomePopup = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showSelectedComponent, setShowSelectedComponent] = useState(false);

  const handleContinue = () => {
    if (selectedIndex !== null) {
      setShowSelectedComponent(true);
    }
  };

  return (
    <>
      {showSelectedComponent ? (
        React.createElement(information[selectedIndex!].component)
      ) : (
        <>
          <div className="mt-4 flex items-center gap-2">
            {information.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full md:w-1/2 mb-[1em] border p-5 rounded-xl cursor-pointer ${
                  selectedIndex === index ? 'border-black' : 'border-gray-300'
                }`}
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div>
            <Button
              className="w-full rounded-full py-4"
              disabled={selectedIndex === null}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default WelcomePopup;
