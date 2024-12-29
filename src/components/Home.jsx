import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
	const [commentInput, setCommentInput] = useState("");
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get("https://post-something-backend.onrender.com/api/posts");
				setPosts(response.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	const handleLike = async (postId) => {
		try {
			const response = await axios.post(`https://post-something-backend.onrender.com/api/posts/like/${postId}`);
			setPosts((prevPosts) =>
				prevPosts.map((post) => (post._id === postId ? response.data : post))
			);
		} catch (error) {
			console.error("Error liking post:", error);
		}
	};

	const handleAddComment = async (postId, commentText) => {
		if (!commentText.trim()) return alert("Comment cannot be empty!");

		try {
			const response = await axios.post(`https://post-something-backend.onrender.com/api/posts/comment/${postId}`, {
				text: commentText,
			});
			setPosts((prevPosts) =>
				prevPosts.map((post) => (post._id === postId ? response.data : post))
			);
			setCommentInput("");
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	if (loading) {
		return <p>Loading posts...</p>;
	}

	return (
		<div className="home">
			<h2>Recent Posts</h2>
			{posts.length === 0 ? (
				<p>No posts available.</p>
			) : (
				posts.map((post) => (
					<div key={post._id} className="post">
						<h3>{post.title}</h3>
						<p>{post.content}</p>
						{post.file && (
							<div>
								{post.file.endsWith(".mp4") ? (
									<video width="320" height="240" controls>
										<source
											src={`https://post-something-backend.onrender.com/uploads/${post.file}`}
											type="video/mp4"
										/>
										Your browser does not support the video tag.
									</video>
								) : (
									<img
										src={`https://post-something-backend.onrender.com/uploads/${post.file}`}
										alt="Post Media"
									/>
								)}
							</div>
						)}
						<p>Likes: {post.likes}</p>
						<button onClick={() => handleLike(post._id)}>Like</button>
						<p>Comments: {post.comments.length}</p>
						<ul>
							{post.comments.map((comment, index) => (
								<li key={index}>{comment.text}</li>
							))}
						</ul>
						<div>
							<input
								type="text"
								placeholder="Add a comment"
								value={commentInput}
								className="comment-input"
								onChange={(e) => setCommentInput(e.target.value)}
							/>
							<button
								onClick={() => handleAddComment(post._id, commentInput)}
								className="comment-button"
							>
								Add Comment
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default Home;
