import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STYLED_BUTTON } from '@/constant/style';
import { Wallet } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

export default function SignIn() {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletAction = () => {
    if (publicKey) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-center text-gray-600">
            We're glad to see you again!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-500">
            Connect your wallet to access your store and continue managing your
            business.
          </p>
          {publicKey ? (
            <Button className={STYLED_BUTTON} size={'lg'}>
              <Link href="/dashboard">Go To Dashboard </Link>
            </Button>
          ) : (
            <Button
              className={`w-full ${STYLED_BUTTON}`}
              type="button"
              onClick={handleWalletAction}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
