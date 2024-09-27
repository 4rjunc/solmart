import React from 'react';
import moment from 'moment';
import StatOverview from '@/components/dashboard/stats/statOverview';
import RecentTransactions from '@/components/dashboard/transactions';
import Overview from '@/components/dashboard/stats/overview';
import DefaultModal from '@/components/layout/modal';
import { AddProduct } from '@/components/dashboard/products/addProduct';
import { STYLED_BUTTON } from '@/constant/style';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import MartNoItemsFound from '@/components/fallback/noDataFound';

const TransactionsTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <center>
          <MartNoItemsFound />
        </center>
      </div>
    </div>
  );
};

export default TransactionsTab;
