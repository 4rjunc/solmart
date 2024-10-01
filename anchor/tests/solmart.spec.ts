import * as anchor from '@coral-xyz/anchor';
import { Program, BN } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Solmart } from '../target/types/solmart';
import { before } from 'node:test';

describe('solmart', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  // const user1: anchor.web3.Signer = provider.wallet as anchor.Wallet;
  const merchant1: anchor.web3.Signer = anchor.web3.Keypair.generate();
  const merchant2: anchor.web3.Signer = anchor.web3.Keypair.generate();

  const program = anchor.workspace.Solmart as Program<Solmart>;

  const solmartKeypair = Keypair.generate();

  let merchant1DataPda: PublicKey;
  let merchant1DataBump: number;

  it('setup acc.', async () => {
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
        .initializeMerchant('AppleHub', 'USD')
        .accounts({
          merchantData: merchant1DataPda,
          authority: merchant1.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([merchant1])
        .rpc();

      const merchant1Data = await program.account.merchantData.fetch(
        merchant1DataPda
      );
      console.log('merchant1Data', merchant1Data);
      expect(merchant1Data.invoiceCount).toEqual(0);
    } catch (error) {
      console.error('Error in Initialize merchant1:', error);
      throw error;
    }
  });

  it('merchant1: Adding Transaction', async () => {
    try {
      const [transactionPda] = await PublicKey.findProgramAddress(
        [Buffer.from('merchant'), merchant1.publicKey.toBuffer()],
        program.programId
      );

      await program.methods
        .addInvoiceLink(
          'QmYwAPJzv5CZsnAzt8auVZRn5TqFccxPC6vUnchA8wsZys',
          '0x5d5e3fb709d93e3ef56a452287e0b71591dc6a953e7a2eeb83669a5a752a0bb5'
        )
        .accounts({
          merchantData: merchant1DataPda,
          authority: merchant1.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([merchant1])
        .rpc();

      const invoiceData = await program.account.merchantData.fetch(
        transactionPda
      );
      expect(invoiceData.authority.toString()).toEqual(
        merchant1.publicKey.toString()
      );

      console.log('merchant1Data Adding', invoiceData);
      expect(invoiceData.invoiceCount).toEqual(1);

      // Access the first invoice in the invoiceLinks array
      const firstInvoice = invoiceData.invoiceLinks[0];

      // Ensure the cidHash and txSignature match
      expect(firstInvoice.cidHash).toEqual(
        'QmYwAPJzv5CZsnAzt8auVZRn5TqFccxPC6vUnchA8wsZys'
      );
      expect(firstInvoice.txSignature).toEqual(
        '0x5d5e3fb709d93e3ef56a452287e0b71591dc6a953e7a2eeb83669a5a752a0bb5'
      );
    } catch (error) {
      console.error('Error in Adding Transaction:', error);
      throw error;
    }
  });
});
