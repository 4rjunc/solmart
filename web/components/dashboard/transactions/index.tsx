import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent } from '@/components/ui/card';
import MartNoItemsFound from '@/components/fallback/noDataFound';

interface IData {
  name: string;
  amount: string;
}
const recentSales:IData[] = [
  // { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
  // { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
];

const RecentTransactions = () => {
  return (
    <CardContent>
      <ul className="space-y-4">
        {
           recentSales.length === 0 ? <MartNoItemsFound/> : <>
            {recentSales.map((sale, index) => (
          <li key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{sale.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{sale.name}</p>
             
            </div>
            <div className="ml-auto font-medium">{sale.amount}</div>
          </li>
        ))}
          </>
        }
      </ul>
    </CardContent>
  );
};

export default RecentTransactions;
