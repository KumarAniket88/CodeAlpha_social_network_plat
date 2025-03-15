import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
        const postsRes = await axios.get(`http://localhost:5000/api/posts/user/${res.data._id}`);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-4">
      {user ? (
        <>
          <h2 className="text-2xl font-bold">{user.username}'s Profile</h2>
          <p>Email: {user.email}</p>
          <h3 className="text-lg font-bold mt-4">Posts</h3>
          {posts.map((post) => (
            <div key={post._id} className="border p-3 mt-2">
              <p>{post.text}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;


