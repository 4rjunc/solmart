'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useSsfDemoDayProjectProgram } from './ssf-demo-day-project-data-access';
import {
  SsfDemoDayProjectCreate,
  SsfDemoDayProjectList,
} from './ssf-demo-day-project-ui';

export default function SsfDemoDayProjectFeature() {
  const { publicKey } = useWallet();
  const { programId } = useSsfDemoDayProjectProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="SsfDemoDayProject"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <SsfDemoDayProjectCreate />
      </AppHero>
      <SsfDemoDayProjectList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
