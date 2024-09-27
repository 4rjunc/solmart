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

const DefaultTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <DefaultModal
            modalTrigger={
              <Button className={`w-full ${STYLED_BUTTON}`}>
                Add New Product
              </Button>
            }
          >
            <AddProduct />
          </DefaultModal>
        </div>
      </div>

      <div>
        <StatOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="" id="overview">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <Overview />
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <RecentTransactions />
        </Card>
      </div>
    </div>
  );
};

export default DefaultTab;
