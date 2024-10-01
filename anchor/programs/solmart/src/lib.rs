#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("J89KZSRu7YYpN4W54544g4fKRoiSWpSP6bdY7VkuLmEB");

#[program]
pub mod solmart {
    use super::*;

    pub fn initialize_merchant(ctx: Context<InitializeMerchant>, shop_name: String, currency: String) -> Result<()> {
        let merchant_data = &mut ctx.accounts.merchant_data;
        merchant_data.authority = ctx.accounts.authority.key();
        merchant_data.shop_name = shop_name;
        merchant_data.currency = currency;
        merchant_data.invoice_count = 0;
        Ok(())
    }

    pub fn add_invoice_link(
        ctx: Context<AddInvoiceLink>,
        cid_hash: String,
        tx_signature: String,
    ) -> Result<()> {
        let merchant_data = &mut ctx.accounts.merchant_data;

        merchant_data.invoice_links.push(InvoiceLink{
            cid_hash,
            tx_signature,
        });

        merchant_data.invoice_count += 1;
        Ok(())
    }

    // pub fn resize_merchant_account(ctx: Context<ResizeMerchantAccount>, new_space: u64) -> Result<()> {
    //     let account_info = ctx.accounts.merchant_data.to_account_info();
    //     let new_minimum_balance = Rent::get()?.minimum_balance(new_space as usize);
    //     let lamports_diff = new_minimum_balance.saturating_sub(account_info.lamports());
    //
    //     if lamports_diff > 0 {
    //         transfer(ctx.accounts.authority.to_account_info(), account_info, lamports_diff)?;
    //     }
    //
    //     account_info.realloc(new_space as usize, false)?;
    //
    //     Ok(())
    // }
}

#[derive(Accounts)]
#[instruction(shop_name: String, currency: String)]
pub struct InitializeMerchant<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + shop_name.len() + 4 + currency.len() + 4 + 32, // discriminator + pubkey + shop_name + currency + invoice_count + extra space
        seeds = [b"merchant", authority.key().as_ref()],
        bump
    )]
    pub merchant_data: Account<'info, MerchantData>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddInvoiceLink<'info> {
    #[account(
        mut,
        seeds = [b"merchant", authority.key().as_ref()],
        bump,
        has_one = authority,
        realloc = merchant_data.to_account_info().data_len() + 128,
        realloc::payer = authority,
        realloc::zero = false
    )]
    pub merchant_data: Account<'info, MerchantData>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResizeMerchantAccount<'info>{
    #[account(
        mut,
        seeds = [b"merchant", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub merchant_data: Account<'info, MerchantData>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct MerchantData {
    pub authority: Pubkey,
    pub shop_name: String,
    pub currency: String,
    pub invoice_count: u32,
    pub invoice_links: Vec<InvoiceLink>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct InvoiceLink{
    pub cid_hash: String,
    pub tx_signature: String
}


