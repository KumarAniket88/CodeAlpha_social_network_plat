import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await axios.get("http://localhost:5000/api/posts", {
                headers: { Authorization: token }
            });

            setPosts(res.data);
        };

        fetchPosts();
    }, []);

    const handleCreatePost = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axios.post(
            "http://localhost:5000/api/posts",
            { text },
            { headers: { Authorization: token } }
        );

        setText("");
        window.location.reload();
    };

    return (
        <div>
            <h1>Feed</h1>
            <input type="text" placeholder="What's on your mind?" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleCreatePost}>Post</button>

            {posts.map(post => (
                <div key={post._id}>
                    <p><strong>{post.user.name}</strong>: {post.text}</p>
                    {post.image && <img src={post.image} alt="Post" width="200" />}
                </div>
            ))}
        </div>
    );
};

export default Feed;


