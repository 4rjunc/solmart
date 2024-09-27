// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import SolmartIDL from '../target/idl/solmart.json';
import type { Solmart } from '../target/types/solmart';

// Re-export the generated IDL and type
export { Solmart, SolmartIDL };

// The programId is imported from the program IDL.
export const SOLMART_PROGRAM_ID = new PublicKey(SolmartIDL.address);

// This is a helper function to get the SsfDemoDayProject Anchor program.
export function getSolmartProgram(provider: AnchorProvider) {
  return new Program(SolmartIDL as Solmart, provider);
}

// This is a helper function to get the program ID for the SsfDemoDayProject program depending on the cluster.
export function getSolmartProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return SOLMART_PROGRAM_ID;
  }
}
