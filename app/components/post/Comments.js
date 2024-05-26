// import React, { useState } from 'react';

// const Comments = ({ comments }) => {
//   const [newComment, setNewComment] = useState('');
//   const [commentList, setCommentList] = useState(comments);

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       setCommentList([...commentList, newComment]);
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="mt-4">
//       <form onSubmit={handleCommentSubmit} className="mb-4">
//         <input
//           type="text"
//           value={newComment}
//           onChange={handleCommentChange}
//           placeholder="Write a comment..."
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
//           Post Comment
//         </button>
//       </form>
//       <div>
//         {/* {commentList.map((comment, index) => (
//           <p key={index} className="mb-2">
//             {comment}
//           </p>
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default Comments;

import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
