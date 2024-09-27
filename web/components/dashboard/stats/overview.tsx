import React from 'react';
import { CardContent } from '@/components/ui/card';
import MartNoItemsFound from '@/components/fallback/noDataFound';
const Overview = () => {
  return (
    <CardContent>
      <MartNoItemsFound title="No Data Yet" />
    </CardContent>
  );
};

export default Overview;
