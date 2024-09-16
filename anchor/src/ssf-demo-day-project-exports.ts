// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import SsfDemoDayProjectIDL from '../target/idl/ssf_demo_day_project.json';
import type { SsfDemoDayProject } from '../target/types/ssf_demo_day_project';

// Re-export the generated IDL and type
export { SsfDemoDayProject, SsfDemoDayProjectIDL };

// The programId is imported from the program IDL.
export const SSF_DEMO_DAY_PROJECT_PROGRAM_ID = new PublicKey(
  SsfDemoDayProjectIDL.address
);

// This is a helper function to get the SsfDemoDayProject Anchor program.
export function getSsfDemoDayProjectProgram(provider: AnchorProvider) {
  return new Program(SsfDemoDayProjectIDL as SsfDemoDayProject, provider);
}

// This is a helper function to get the program ID for the SsfDemoDayProject program depending on the cluster.
export function getSsfDemoDayProjectProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return SSF_DEMO_DAY_PROJECT_PROGRAM_ID;
  }
}
