import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { MerchantTransactionHistory } from '../target/types/merchant_transaction_history';

describe('ssf-demo-day-project', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace
    .SsfDemoDayProject as Program<MerchantTransactionHistory>;

  const ssfDemoDayProjectKeypair = Keypair.generate();

  it('Can add a transaction', async () => {
    // Generate a new account for this transaction
    const transaction = anchor.web3.Keypair.generate();

    // Add a transaction
    await program.methods
      .addTransaction(
        'Test Product',
        new anchor.BN(2),
        new anchor.BN(1000000), // 1 SOL in lamports
        new anchor.BN(2000000), // 2 SOL in lamports
        new anchor.BN(2000000) // 2 SOL paid in lamports
      )
      .accounts({
        transaction: transaction.publicKey,
        merchant: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([transaction])
      .rpc();

    // Fetch the account details
    const account = await program.account.transaction.fetch(
      transaction.publicKey
    );

    // Verify the account data
    // expect(account.merchant.toString()).to.equal(
    //   provider.wallet.publicKey.toString()
    // );
    // expect(account.productName).to.equal('Test Product');
    // expect(account.quantity.toNumber()).to.equal(2);
    // expect(account.price.toNumber()).to.equal(1000000);
    // expect(account.totalPrice.toNumber()).to.equal(2000000);
    // expect(account.solPaid.toNumber()).to.equal(2000000);
    // expect(account.timestamp.toNumber()).to.be.greaterThan(0);
  });
});
