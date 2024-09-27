import React from 'react';
import MartNoItemsFound from '@/components/fallback/noDataFound';

const TransactionsTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div>
        <MartNoItemsFound
          title="No Transactions Yet"
          description="Transactions would be displayed here, when available "
        />
      </div>
    </div>
  );
};

export default TransactionsTab;
