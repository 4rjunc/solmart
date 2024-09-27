import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const stats = [
  {
    title: 'Total Transactions',
    value: 0,

  },
  {
    title: 'Total Products',
    value: 0,

  },
  {
    title: 'Total Sales',
    value: 0,

  },
];

const StatOverview = () => {
  const { wallet, connected } = useWallet();
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && wallet?.publicKey) {
        setLoadingBalance(true);
        const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

        try {
          const balance = await connection.getBalance(wallet.publicKey);
          setWalletBalance(balance / 1e9); 
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
          setWalletBalance(null);
        } finally {
          setLoadingBalance(false);
        }
      }
    };

    fetchBalance();
  }, [connected, wallet]);

  return (
    <div className="flex gap-2 mb-4">
   
      <Card className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm md:text-md font-medium">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {loadingBalance
              ? 'Loading...'
              : walletBalance !== null
              ? `${walletBalance.toFixed(2)} SOL`
              : '0 SOL'}
          </div>
        </CardContent>
      </Card>

      {/* Other Stats */}
      {stats.map((stat, index) => (
        <Card key={index} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm md:text-md font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatOverview;
