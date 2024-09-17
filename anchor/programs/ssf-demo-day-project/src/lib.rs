#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("HL4kgSUiSG7CaC7GojG1UGt7zA6MeSqoBcXH9bjvDpu1");

#[program]
pub mod merchant_transaction_history {
    use super::*;

    pub fn add_transaction(
        ctx: Context<AddTransaction>,
        product_name: String,
        quantity: u64,
        price: u64,
        total_price: u64,
        sol_paid: u64,
    ) -> Result<()> {
        let transaction = &mut ctx.accounts.transaction;
        let merchant = &ctx.accounts.merchant;

        transaction.merchant = merchant.key();
        transaction.product_name = product_name;
        transaction.quantity = quantity;
        transaction.price = price;
        transaction.total_price = total_price;
        transaction.sol_paid = sol_paid;
        transaction.timestamp = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn get_transaction(ctx: Context<GetTransaction>) -> Result<TransactionDetails> {
        let transaction = &ctx.accounts.transaction;

        Ok(TransactionDetails {
            merchant: transaction.merchant,
            product_name: transaction.product_name.clone(),
            quantity: transaction.quantity,
            price: transaction.price,
            total_price: transaction.total_price,
            sol_paid: transaction.sol_paid,
            timestamp: transaction.timestamp,
        })
    }
}

#[derive(Accounts)]
pub struct AddTransaction<'info> {
    #[account(init, payer = merchant, space = Transaction::LEN)]
    pub transaction: Account<'info, Transaction>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetTransaction<'info> {
    pub transaction: Account<'info, Transaction>,
}

#[account]
pub struct Transaction {
    pub merchant: Pubkey,
    pub product_name: String,
    pub quantity: u64,
    pub price: u64,
    pub total_price: u64,
    pub sol_paid: u64,
    pub timestamp: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct TransactionDetails {
    pub merchant: Pubkey,
    pub product_name: String,
    pub quantity: u64,
    pub price: u64,
    pub total_price: u64,
    pub sol_paid: u64,
    pub timestamp: i64,
}

impl Transaction {
    const LEN: usize = 8 + // discriminator
        32 + // merchant pubkey
        4 + 50 + // product_name (max 50 chars)
        8 + // quantity
        8 + // price
        8 + // total_price
        8 + // sol_paid
        8; // timestamp
}
