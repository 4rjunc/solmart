import * as anchor from '@coral-xyz/anchor';
import { Program, BN } from '@coral-xyz/anchor';
import {
  getSolmartProgram,
  getSolmartProgramId,
  Solmart,
} from '@solmart/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { Import } from 'lucide-react';

export async function GET(request: Request) {
  const { publicKey } = useWallet();
  const merchant1DataPda: PublicKey;
  const merchant1DataBump: number;

  const program = anchor.workspace.Solmart as Program<Solmart>;
  [merchant1DataPda, merchant1DataBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from('merchant'), publicKey.publicKey.toBuffer()],
      program.programId
    );

  return new Response('Hello, from API!');
}
