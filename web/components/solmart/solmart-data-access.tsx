'use client';

import { getSolmartProgram, getSolmartProgramId } from '@solmart/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import * as anchor from '@coral-xyz/anchor';

export function useSolmartProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getSolmartProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getSolmartProgram(provider);

  const accounts = useQuery({
    queryKey: ['ssf-demo-day-project', 'all', { cluster }],
    queryFn: () => program.account.ssfDemoDayProject.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['solmart', 'initialize', { cluster }],
    mutationFn: async ({ keypair, merchantName, currency }) => {
      // Derive the PDA using the 'merchant' seed and merchant public key
      const [merchantPda, merchantBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from('merchant'), keypair.publicKey.toBuffer()],
          program.programId
        );

      // Call the initializeMerchant method with the PDA and merchant details
      return program.methods
        .initializeMerchant(merchantName, currency)
        .accounts({
          merchantData: merchantPda,
          authority: keypair.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([keypair])
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize merchant account'),
  });
  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useSolmartProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useSolmartProgram();

  const accountQuery = useQuery({
    queryKey: ['ssf-demo-day-project', 'fetch', { cluster, account }],
    queryFn: () => program.account.ssfDemoDayProject.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['ssf-demo-day-project', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ ssfDemoDayProject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['ssf-demo-day-project', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods
        .decrement()
        .accounts({ ssfDemoDayProject: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['ssf-demo-day-project', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods
        .increment()
        .accounts({ ssfDemoDayProject: account })
        .rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['ssf-demo-day-project', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ ssfDemoDayProject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
