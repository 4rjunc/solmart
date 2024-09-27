#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("HL4kgSUiSG7CaC7GojG1UGt7zA6MeSqoBcXH9bjvDpu1");

#[program]
pub mod solmart {
    use super::*;

    pub fn initialize_merchant(ctx: Context<InitializeMerchant>) -> Result<()> {
        let merchant_data = &mut ctx.accounts.merchant_data;
        merchant_data.transaction_count = 0;
        Ok(())
    }

    pub fn add_transaction(
        ctx: Context<AddTransaction>,
        product_name: String,
        quantity: u64,
        price: u64,
        total_price: u64,
        sol_paid: u64,
    ) -> Result<()> {
        let transaction = &mut ctx.accounts.transaction;
        let merchant_data = &mut ctx.accounts.merchant_data;

        transaction.merchant = ctx.accounts.merchant.key();
        transaction.product_name = product_name;
        transaction.quantity = quantity;
        transaction.price = price;
        transaction.total_price = total_price;
        transaction.sol_paid = sol_paid;
        transaction.timestamp = Clock::get()?.unix_timestamp;
        transaction.transaction_number = merchant_data.transaction_count;

        merchant_data.transaction_count += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeMerchant<'info> {
    #[account(
        init,
        payer = merchant,
        space = 8 + 8, // discriminator + transaction_count
        seeds = [b"merchant", merchant.key().as_ref()],
        bump
    )]
    pub merchant_data: Account<'info, MerchantData>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddTransaction<'info> {
    #[account(
        init,
        payer = merchant,
        space = Transaction::LEN,
        seeds = [b"transaction", merchant.key().as_ref(), &merchant_data.transaction_count.to_le_bytes()],
        bump
    )]
    pub transaction: Account<'info, Transaction>,
    #[account(
        mut,
        seeds = [b"merchant", merchant.key().as_ref()],
        bump
    )]
    pub merchant_data: Account<'info, MerchantData>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MerchantData {
    pub transaction_count: u64,
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
    pub transaction_number: u64,
}

impl Transaction {
    const LEN: usize = 8 + // discriminator
        32 + // merchant pubkey
        4 + 50 + // product_name (max 50 chars)
        8 + // quantity
        8 + // price
        8 + // total_price
        8 + // sol_paid
        8 + // timestamp
        8; // transaction_number
}
