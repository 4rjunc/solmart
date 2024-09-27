'use client';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DefaultTab from '@/components/dashboard/tabs/defaultTab';
import ProductsTab from '@/components/dashboard/tabs/productsTab';
import TransactionsTab from '@/components/dashboard/tabs/transactionsTab';
import BillingTab from '@/components/dashboard/tabs/billingTab';

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
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div>
          {activeTab === 'overview' && <DefaultTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'transactions' && <TransactionsTab />}
          {activeTab === 'billing' && <BillingTab />}
        </div>
      </main>
    </div>
  );
}
