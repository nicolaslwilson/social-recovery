use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod social_recovery {
    use super::*;

    pub fn initialize(ctx: Context<InitializeRecoveryWallet>, authority: Pubkey) -> Result<()> {
        ctx.accounts.wallet.authority = authority;
        ctx.accounts.wallet.bump = *ctx.bumps.get("wallet").unwrap();
        Ok(())
    }
}

#[account]
#[derive(Default)]
pub struct RecoveryWallet {
    authority: Pubkey,
    signers: Vec<Pubkey>, // limit of 10
    bump: u8,
}

impl RecoveryWallet {
    pub const MAX_SIZE: usize = 32 + 10 * 32;
}

#[derive(Accounts)]
#[instruction(authority: Pubkey)]
pub struct InitializeRecoveryWallet<'info> {
    #[account(init, payer = payer, space = 8 + RecoveryWallet::MAX_SIZE,
         seeds = [ b"wallet".as_ref(), authority.to_bytes().as_ref()], bump)]
    pub wallet: Account<'info, RecoveryWallet>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
