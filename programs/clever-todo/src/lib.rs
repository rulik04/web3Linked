use anchor_lang::prelude::*;

pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

declare_id!("J4dztW37WTPcTTY1H1JuqPXDzTd6fFXnQNkJNGVHEu6x");

#[program]
pub mod web3_linkedin {
    use super::*;

    pub fn initialize(ctx: Context<InitializeUser>, name: String) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.name = name; // Set the user's name
        user_profile.friends = vec![];
        user_profile.pending_requests_sent = vec![];
        user_profile.pending_requests_received = vec![];
        Ok(())
    }

    pub fn send_friend_request(ctx: Context<SendFriendRequest>) -> Result<()> {
        let sender_profile = &mut ctx.accounts.sender_profile;
        let receiver_profile_key = ctx.accounts.friend_profile.key();
        let receiver_profile = &mut ctx.accounts.friend_profile;

        sender_profile
            .pending_requests_sent
            .push(receiver_profile_key);

        receiver_profile
            .pending_requests_received
            .push(ctx.accounts.sender_profile.key());

        Ok(())
    }

    pub fn accept_friend_request(ctx: Context<AcceptFriendRequest>) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let sender_profile = &mut ctx.accounts.sender_profile;

        user_profile.friends.push(sender_profile.key());

        sender_profile.friends.push(user_profile.key());

        if let Some(index) = user_profile
            .pending_requests_received
            .iter()
            .position(|&r| r == sender_profile.key())
        {
            user_profile.pending_requests_received.remove(index);
        }

        if let Some(index) = sender_profile
            .pending_requests_sent
            .iter()
            .position(|&r| r == user_profile.key())
        {
            sender_profile.pending_requests_sent.remove(index);
        }

        Ok(())
    }

    pub fn reject_friend_request(ctx: Context<RejectFriendRequest>) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let sender_profile = &mut ctx.accounts.sender_profile;

        if let Some(index) = user_profile
            .pending_requests_received
            .iter()
            .position(|&r| r == sender_profile.key())
        {
            user_profile.pending_requests_received.remove(index);
        }

        if let Some(index) = sender_profile
            .pending_requests_sent
            .iter()
            .position(|&r| r == user_profile.key())
        {
            sender_profile.pending_requests_sent.remove(index);
        }

        Ok(())
    }

    pub fn remove_from_sent_request(ctx: Context<RemoveFromSentRequest>) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let delete_who_profile = &mut ctx.accounts.delete_who;

        if let Some(index) = user_profile
            .pending_requests_sent
            .iter()
            .position(|&r| r == delete_who_profile.key())
        {
            user_profile.pending_requests_sent.remove(index);
        }

        if let Some(index) = delete_who_profile
            .pending_requests_received
            .iter()
            .position(|&r| r == user_profile.key())
        {
            delete_who_profile.pending_requests_received.remove(index);
        }

        Ok(())
    }

    pub fn remove_friend(ctx: Context<RemoveFriend>) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let delete_who_profile = &mut ctx.accounts.delete_who;

        if let Some(index) = user_profile
            .friends
            .iter()
            .position(|&f| f == delete_who_profile.key())
        {
            user_profile.friends.remove(index);
        }

        if let Some(index) = delete_who_profile
            .friends
            .iter()
            .position(|&f| f == user_profile.key())
        {
            delete_who_profile.friends.remove(index);
        }

        Ok(())
    }

}
#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendFriendRequest<'info> {
    #[account(mut)]
    pub friend_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    pub sender_authority: Signer<'info>,
    #[account(mut)]
    pub sender_profile: Box<Account<'info, UserProfile>>,
}

#[derive(Accounts)]
pub struct AcceptFriendRequest<'info> {
    #[account(mut)]
    pub sender_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct RejectFriendRequest<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    pub sender_profile: Box<Account<'info, UserProfile>>,
}

#[derive(Accounts)]
pub struct RemoveFromSentRequest<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    pub delete_who: Box<Account<'info, UserProfile>>,
}

#[derive(Accounts)]
pub struct RemoveFriend<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    pub delete_who: Box<Account<'info, UserProfile>>,
}
