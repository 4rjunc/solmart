#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("HL4kgSUiSG7CaC7GojG1UGt7zA6MeSqoBcXH9bjvDpu1");

#[program]
pub mod ssf_demo_day_project {
    use super::*;

  pub fn close(_ctx: Context<CloseSsfDemoDayProject>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.ssf_demo_day_project.count = ctx.accounts.ssf_demo_day_project.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.ssf_demo_day_project.count = ctx.accounts.ssf_demo_day_project.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSsfDemoDayProject>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.ssf_demo_day_project.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSsfDemoDayProject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + SsfDemoDayProject::INIT_SPACE,
  payer = payer
  )]
  pub ssf_demo_day_project: Account<'info, SsfDemoDayProject>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSsfDemoDayProject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub ssf_demo_day_project: Account<'info, SsfDemoDayProject>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub ssf_demo_day_project: Account<'info, SsfDemoDayProject>,
}

#[account]
#[derive(InitSpace)]
pub struct SsfDemoDayProject {
  count: u8,
}
