use anchor_lang::prelude::*;

pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

declare_id!("8W7iZshR4z1Yy4WJ1MJPAsMCGRzLuWjqXkwCJoatQeHV");

#[program]
pub mod web3_linkedin {
    use super::*;

    pub fn initialize(
        ctx: Context<InitializeUser>,
        name: String,
        profile_picture: String,
    ) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.name = name;
        user_profile.friends = vec![];
        user_profile.profile_picture = profile_picture;
        user_profile.pending_requests_sent = vec![];
        user_profile.pending_requests_received = vec![];
        user_profile.last_post = 0;
        user_profile.post_count = 0;

        Ok(())
    }

    pub fn send_friend_request(ctx: Context<SendFriendRequest>) -> Result<()> {
        let friend_profile = &mut ctx.accounts.friend_profile;
        let user_profile = &mut ctx.accounts.user_profile;

        friend_profile
            .pending_requests_received
            .push(user_profile.key());
        user_profile
            .pending_requests_sent
            .push(friend_profile.key());

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

    pub fn create_post(
        ctx: Context<CreatePost>,
        content: String,
        image: String,
        created_at: String,
    ) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let post = &mut ctx.accounts.post;

        post.authority = ctx.accounts.authority.key();
        post.idx = user_profile.last_post;
        post.content = content;
        post.image = image;
        post.likes = vec![];
        post.created_at = created_at;

        user_profile.last_post = user_profile.last_post.checked_add(1).unwrap();
        user_profile.post_count = user_profile.post_count.checked_add(1).unwrap();

        Ok(())
    }

    pub fn write_comment(
        ctx: Context<WriteComment>,
        content: String,
        created_at: String,
    ) -> Result<()> {
        let post = &mut ctx.accounts.post;
        let comment = &mut ctx.accounts.comment;

        comment.authority = ctx.accounts.authority.key();
        comment.idx = post.last_comment;
        comment.content = content;
        comment.created_at = created_at;
        comment.post = post.key();

        post.last_comment = post.last_comment.checked_add(1).unwrap();
        post.comment_count = post.comment_count.checked_add(1).unwrap();

        Ok(())
    }

    pub fn like_post(ctx: Context<LikePost>, liked: Pubkey) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let post = &mut ctx.accounts.post;

        post.likes.push(liked.key());

        Ok(())
    }

    pub fn delete_like(ctx: Context<DeleteLike>, liked: Pubkey) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let post = &mut ctx.accounts.post;

        if let Some(index) = post.likes.iter().position(|&l| l == liked.key()) {
            post.likes.remove(index);
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
            space = 1024 + std::mem::size_of::<UserProfile>(),
        )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendFriendRequest<'info> {
    #[account(mut)]
    pub friend_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
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

#[derive(Accounts)]
#[instruction()]
pub struct CreatePost<'info> {
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [POST_TAG, authority.key().as_ref(), &[user_profile.last_post as u8].as_ref()],
        bump,
        payer = authority,
        space = 1024 + std::mem::size_of::<Post>(),
    )]
    pub post: Box<Account<'info, Post>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct WriteComment<'info> {
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub post: Box<Account<'info, Post>>,

    #[account(
        init,
        seeds = [COMMENT_TAG, authority.key().as_ref(), post.key().as_ref(), &[post.last_comment as u8].as_ref()],
        bump,
        payer = authority,
        space = 1024 + std::mem::size_of::<Comment>(),
    )]
    pub comment: Box<Account<'info, Comment>>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct LikePost<'info> {
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub post: Box<Account<'info, Post>>,
}


#[derive(Accounts)]
#[instruction()]
pub struct DeleteLike<'info> {
    #[account(
        mut, 
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub post: Box<Account<'info, Post>>,
}



pub fn bump(seeds: &[&[u8]], program_id: &Pubkey) -> u8 {
    let (_found_key, bump) = Pubkey::find_program_address(seeds, program_id);
    bump
}
