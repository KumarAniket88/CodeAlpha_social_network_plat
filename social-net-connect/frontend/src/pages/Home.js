import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);

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

    return (
        <div>
            <h1>Home Feed</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <p><strong>{post.user.name}</strong>: {post.text}</p>
                    {post.image && <img src={post.image} alt="Post" width="200" />}
                </div>
            ))}
        </div>
    );
};

export default Home;


