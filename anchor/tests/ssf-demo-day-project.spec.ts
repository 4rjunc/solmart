import * as anchor from '@coral-xyz/anchor';
import { Program, BN } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { SsfDemoDayProject } from '../target/types/ssf_demo_day_project';
import { before } from 'node:test';

describe('ssf-demo-day-project', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  // const user1: anchor.web3.Signer = provider.wallet as anchor.Wallet;
  const merchant1: anchor.web3.Signer = anchor.web3.Keypair.generate();
  const merchant2: anchor.web3.Signer = anchor.web3.Keypair.generate();

  const program = anchor.workspace
    .SsfDemoDayProject as Program<SsfDemoDayProject>;

  const ssfDemoDayProjectKeypair = Keypair.generate();

  let merchant1DataPda: PublicKey;
  let merchant1DataBump: number;

  it('Airdrop', async () => {
    try {
      const sig = await provider.connection.requestAirdrop(
        merchant1.publicKey,
        100000000
      );
      await provider.connection.confirmTransaction(sig);
    } catch (err) {
      console.error('Airdrop failed:', err);
    }
    console.log('RPC Endpoint:', provider.connection.rpcEndpoint);
    console.log('Merchant 1 Public Key:', merchant1.publicKey.toBase58());
    const balance = await provider.connection.getBalance(merchant1.publicKey);
    console.log(`Merchant 1 Balance: ${balance}`);

    await provider.connection.requestAirdrop(merchant2.publicKey, 1000000000);

    [merchant1DataPda, merchant1DataBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('merchant'), merchant1.publicKey.toBuffer()],
        program.programId
      );
  });

  it('Initialize merchant1', async () => {
    try {
      await program.methods
        .initializeMerchant()
        .accounts({
          merchantData: merchant1DataPda,
          merchant: merchant1.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([merchant1])
        .rpc();

      const merchantData = await program.account.merchantData.fetch(
        merchant1DataPda
      );
      expect(merchantData.transactionCount.toNumber()).toEqual(0);
    } catch (error) {
      console.error('Error in Initialize merchant1:', error);
      throw error;
    }
  });

  it('merchant1: Adding Transaction', async () => {
    try {
      const [transactionPda] = await PublicKey.findProgramAddress(
        [
          Buffer.from('transaction'),
          merchant1.publicKey.toBuffer(),
          new BN(0).toArrayLike(Buffer, 'le', 8),
        ],
        program.programId
      );

      await program.methods
        .addTransaction(
          'Product 1',
          new BN(2),
          new BN(1000000),
          new BN(2000000),
          new BN(2000000)
        )
        .accounts({
          transaction: transactionPda,
          merchantData: merchant1DataPda,
          merchant: merchant1.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([merchant1])
        .rpc();

      const transactionData = await program.account.transaction.fetch(
        transactionPda
      );
      expect(transactionData.merchant.toString()).toEqual(
        merchant1.publicKey.toString()
      );
      expect(transactionData.productName).toEqual('Product 1');
      expect(transactionData.quantity.toNumber()).toEqual(2);
      expect(transactionData.price.toNumber()).toEqual(1000000);
      expect(transactionData.totalPrice.toNumber()).toEqual(2000000);
      expect(transactionData.solPaid.toNumber()).toEqual(2000000);
      expect(transactionData.transactionNumber.toNumber()).toEqual(0);

      const merchantData = await program.account.merchantData.fetch(
        merchant1DataPda
      );
      expect(merchantData.transactionCount.toNumber()).toEqual(1);
    } catch (error) {
      console.error('Error in Adding Transaction:', error);
      throw error;
    }
  });
});
