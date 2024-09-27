import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Totals Transactions',
    value: 0,
    change: '+20.1% from last month',
    changeColor: 'text-green-500',
  },
  {
    title: 'Total Products',
    value: 0,
    change: '+180.1% from last month',
    changeColor: 'text-green-500',
  },
  {
    title: 'Total Sales',
    value: 0,
    change: '+19% from last month',
    changeColor: 'text-green-500',
  },
];

const StatOverview = () => {
  return (
    <div className="flex gap-2 mb-4">
      {stats.map((stat, index) => (
        <Card key={index} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatOverview;
