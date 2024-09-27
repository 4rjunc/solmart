'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import moment from 'moment';
import StatOverview from '@/components/dashboard/stats/statOverview';
import RecentTransactions from '@/components/dashboard/transactions';
import Overview from '@/components/dashboard/stats/overview';
import DefaultModal from '@/components/layout/modal';
import { AddProduct } from '@/components/dashboard/products/addProduct';
import { STYLED_BUTTON } from '@/constant/style';

export default function DarkDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen text-black ">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Avatar>
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt="Alicia Koch"
                  />
                  <AvatarFallback>EO</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">Emmanuel Obiabo</h2>
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="customers">Products</TabsTrigger>
                  <TabsTrigger value="products">Transactions</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <DefaultModal
              modalTrigger={<Button className={`w-full ${STYLED_BUTTON}`}>Add New Product</Button>}
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
      </main>
    </div>
  );
}
