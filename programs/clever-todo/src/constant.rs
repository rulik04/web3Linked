use anchor_lang::prelude::*;

#[constant]
pub const USER_TAG: &[u8] = b"USER_STATE";

#[constant]
pub const POST_TAG: &[u8] = b"POST_STATE";

#[constant]
pub const COMMENT_TAG: &[u8] = b"COMMENT_STATE";