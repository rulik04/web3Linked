use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub name: String,
    pub friends: Vec<Pubkey>,
    pub pending_requests_sent: Vec<Pubkey>,
    pub pending_requests_received: Vec<Pubkey>,
}
