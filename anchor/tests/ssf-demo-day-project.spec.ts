import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { SsfDemoDayProject } from '../target/types/ssf_demo_day_project';

describe('ssf-demo-day-project', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace
    .SsfDemoDayProject as Program<SsfDemoDayProject>;

  const ssfDemoDayProjectKeypair = Keypair.generate();

  it('Initialize SsfDemoDayProject', async () => {
    await program.methods
      .initialize()
      .accounts({
        ssfDemoDayProject: ssfDemoDayProjectKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([ssfDemoDayProjectKeypair])
      .rpc();

    const currentCount = await program.account.ssfDemoDayProject.fetch(
      ssfDemoDayProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment SsfDemoDayProject', async () => {
    await program.methods
      .increment()
      .accounts({ ssfDemoDayProject: ssfDemoDayProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.ssfDemoDayProject.fetch(
      ssfDemoDayProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment SsfDemoDayProject Again', async () => {
    await program.methods
      .increment()
      .accounts({ ssfDemoDayProject: ssfDemoDayProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.ssfDemoDayProject.fetch(
      ssfDemoDayProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement SsfDemoDayProject', async () => {
    await program.methods
      .decrement()
      .accounts({ ssfDemoDayProject: ssfDemoDayProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.ssfDemoDayProject.fetch(
      ssfDemoDayProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set ssfDemoDayProject value', async () => {
    await program.methods
      .set(42)
      .accounts({ ssfDemoDayProject: ssfDemoDayProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.ssfDemoDayProject.fetch(
      ssfDemoDayProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the ssfDemoDayProject account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        ssfDemoDayProject: ssfDemoDayProjectKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.ssfDemoDayProject.fetchNullable(
      ssfDemoDayProjectKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
