import { Button } from '@/components/ui/button';
import DefaultModal from '../layout/modal';
import WelcomePopup from '../dashboard/setup';

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
        Embed Seamless Payments
        <br />
        in Your Shop
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Accept crypto payments directly in your shop using the power of Solana
        blockchain technology.
      </p>
      <DefaultModal
       
        modalTrigger={
          <Button className="rounded-full" size={'lg'}>
            Get Started
          </Button>
        }
      >
        <WelcomePopup />
      </DefaultModal>
    </div>
  );
}
