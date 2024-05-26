use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub name: String,
    pub profile_picture: String,
    pub friends: Vec<Pubkey>,
    pub pending_requests_sent: Vec<Pubkey>,
    pub pending_requests_received: Vec<Pubkey>,
    pub last_post: u8,
    pub post_count: u8
}

#[account]
#[derive(Default)]
pub struct Post {
    pub authority: Pubkey,
    pub idx: u8,
    pub content: String,
    pub likes: Vec<Pubkey>,
    pub created_at: String,
    pub image: String,
    pub last_comment: u8,
    pub comment_count: u8
}

#[account]
#[derive(Default)]
pub struct Comment {
    pub authority: Pubkey,
    pub idx: u8,
    pub content: String,
    pub created_at: String,
    pub post: Pubkey,
}