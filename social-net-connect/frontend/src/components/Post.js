import { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async () => {
    if (!newComment) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, { text: newComment });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="font-bold">{post.user.username}</h3>
      <p>{post.text}</p>
      <div className="flex space-x-3">
        <button className="text-blue-500" onClick={handleLike}>Like ({likes})</button>
        <button className="text-gray-500" onClick={handleComment}>Comment</button>
      </div>
      <input className="border p-1 mt-2" type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <div className="mt-2">
        {comments.map((c, idx) => <p key={idx} className="text-sm text-gray-600">{c.text}</p>)}
      </div>
    </div>
  );
};

export default Post;


