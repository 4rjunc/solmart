import React from 'react';
import DefaultModal from '@/components/layout/modal';
import MartNoItemsFound from '@/components/fallback/noDataFound';
import { CreateBilling } from '../billing/createBilling';

const BillingTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>

      <div>
        <div className="flex items-center justify-center">
          <DefaultModal
            modalTrigger={
              <MartNoItemsFound
                title="Add Billing"
                actionLabel="Add Billing"
                onAction={() => {}}
              />
            }
          >
            <CreateBilling />
          </DefaultModal>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;
