'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import SignIn from './signIn';
import SignUp from './signup';
import { StoreIcon } from 'lucide-react';
import { STYLED_BUTTON } from '@/constant/style';

const information = [
  {
    icon: <StoreIcon/>,
    title: 'Sign In',
    description: 'Sign in to your account',
    component: SignIn,
  },
  {
    icon: <StoreIcon/>,
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
                  selectedIndex === index ? 'border-purple-500 border-2' : 'border-gray-300'
                }`}
              >
                <div className='mb-3 border border-gray-500 w-fit h-fit p-2 rounded-full'>
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold text-black">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div>
            <Button
              className={`w-full  py-4 ${STYLED_BUTTON}`}
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
