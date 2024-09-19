#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("HL4kgSUiSG7CaC7GojG1UGt7zA6MeSqoBcXH9bjvDpu1");

#[program]
pub mod ssf_demo_day_project {
  use super::*;

  pub fn initialize(ctx: Context<Initialize>) -> Result<()>{
    Ok(())
  }

  pub fn create_user_account(ctx: Context<CreateUserAccount>) -> Result<()>{
    let user_account = &mut ctx.accounts.user_account;
    user_account.count = 0;
    user_account.user = ctx.accounts.user.key();
    Ok(())
  }

  pub fn increment(ctx: Context<UpdateUserAccount>) -> Result<()>{
    let user_account = &mut ctx.accounts.user_account;
    user_account.count += 1;
    Ok(())
  }

  pub fn decrement(ctx: Context<UpdateUserAccount>)-> Result<()>{
    let user_account = &mut ctx.accounts.user_account;
    user_account.count -=1;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateUserAccount<'info>{
  #[account(
    init,
    payer=user,
    space = 8 + 8 + 32, // discriminator + count + Pubkey
    seeds=[b"counterprogram", user.key().as_ref()],
    bump
  )]
  pub user_account: Account<'info, UserAccount>,

  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct UpdateUserAccount<'info>  {
  #[account(
    mut,
    seeds=[b"counterprogram", user.key().as_ref()],
    bump
  )]
  pub user_account: Account<'info, UserAccount>,
  pub user: Signer<'info>,
}

#[account]
pub struct UserAccount{
  pub count: u64,
  pub user: Pubkey
}
