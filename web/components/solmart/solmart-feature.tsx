'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useSolmartProgram } from './solmart-data-access';

import { SolmartCreate, SolmartList } from './solmart-ui';

export default function SolmartFeature() {
  const { publicKey } = useWallet();
  const { programId } = useSolmartProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="Solmart"
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
        <SolmartCreate />{' '}
        {/* Create an account modify this by initializing account by shopName and Currency*/}
      </AppHero>
      <SolmartList />
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
