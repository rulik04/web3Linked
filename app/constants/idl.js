export const IDL = {
  version: "0.1.0",
  name: "web3_linkedin",
  constants: [
    {
      name: "USER_TAG",
      type: "bytes",
      value: "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]"
    },
    {
      name: "POST_TAG",
      type: "bytes",
      value: "[80, 79, 83, 84, 95, 83, 84, 65, 84, 69]"
    },
    {
      name: "COMMENT_TAG",
      type: "bytes",
      value: "[67, 79, 77, 77, 69, 78, 84, 95, 83, 84, 65, 84, 69]"
    }
  ],
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "profilePicture",
          type: "string"
        }
      ]
    },
    {
      name: "sendFriendRequest",
      accounts: [
        {
          name: "friendProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        }
      ],
      args: []
    },
    {
      name: "acceptFriendRequest",
      accounts: [
        {
          name: "senderProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        }
      ],
      args: []
    },
    {
      name: "rejectFriendRequest",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "senderProfile",
          isMut: true,
          isSigner: false
        }
      ],
      args: []
    },
    {
      name: "removeFromSentRequest",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "deleteWho",
          isMut: true,
          isSigner: false
        }
      ],
      args: []
    },
    {
      name: "removeFriend",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "deleteWho",
          isMut: true,
          isSigner: false
        }
      ],
      args: []
    },
    {
      name: "createPost",
      accounts: [
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "post",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "content",
          type: "string"
        },
        {
          name: "image",
          type: "string"
        },
        {
          name: "createdAt",
          type: "string"
        }
      ]
    },
    {
      name: "writeComment",
      accounts: [
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "post",
          isMut: true,
          isSigner: false
        },
        {
          name: "comment",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "content",
          type: "string"
        },
        {
          name: "createdAt",
          type: "string"
        }
      ]
    },
    {
      name: "likePost",
      accounts: [
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "post",
          isMut: true,
          isSigner: false
        }
      ],
      args: [
        {
          name: "liked",
          type: "publicKey"
        }
      ]
    },
    {
      name: "deleteLike",
      accounts: [
        {
          name: "userProfile",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "post",
          isMut: true,
          isSigner: false
        }
      ],
      args: [
        {
          name: "liked",
          type: "publicKey"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "UserProfile",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey"
          },
          {
            name: "name",
            type: "string"
          },
          {
            name: "profilePicture",
            type: "string"
          },
          {
            name: "friends",
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "pendingRequestsSent",
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "pendingRequestsReceived",
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "lastPost",
            type: "u8"
          },
          {
            name: "postCount",
            type: "u8"
          }
        ]
      }
    },
    {
      name: "Post",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey"
          },
          {
            name: "idx",
            type: "u8"
          },
          {
            name: "content",
            type: "string"
          },
          {
            name: "likes",
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "createdAt",
            type: "string"
          },
          {
            name: "image",
            type: "string"
          },
          {
            name: "lastComment",
            type: "u8"
          },
          {
            name: "commentCount",
            type: "u8"
          }
        ]
      }
    },
    {
      name: "Comment",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey"
          },
          {
            name: "idx",
            type: "u8"
          },
          {
            name: "content",
            type: "string"
          },
          {
            name: "createdAt",
            type: "string"
          },
          {
            name: "post",
            type: "publicKey"
          }
        ]
      }
    }
  ]
}