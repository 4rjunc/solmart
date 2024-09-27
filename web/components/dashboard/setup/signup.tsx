import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { STYLED_BUTTON } from '@/constant/style';
import React, { useState } from 'react';

export default function SignUp() {
  const [storeName, setStoreName] = useState('');

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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {storeName ? `Hi ${storeName} 👋🏽` : 'Get Started 👋🏽'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="storeName"
                className="text-sm font-medium text-gray-700"
              >
                Store Name
              </label>
              <Input
                id="storeName"
                placeholder="Enter your store name"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="storeDescription"
                className="text-sm font-medium text-gray-700"
              >
                Store Description
              </label>
              <Textarea
                id="storeDescription"
                placeholder="Describe your store"
                rows={4}
                required
              />
            </div>
            <Button
              className={`${STYLED_BUTTON} w-full`}
              onClick={handleWalletAction}
              type="button"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
