import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		file: null,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	// Handle input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPost((prev) => ({ ...prev, [name]: value }));
	};

	// Handle file upload changes
	const handleFileChange = (event) => {
		setNewPost((prev) => ({ ...prev, file: event.target.files[0] }));
	};

	// Handle form submission
	const handlePostSubmit = async () => {
		if (!newPost.title || !newPost.content) {
			setError("Title and content are required.");
			return;
		}

		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		if (newPost.file) {
			formData.append("file", newPost.file);
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			await axios.post("https://post-something-backend.onrender.com/api/posts", formData);
			setNewPost({ title: "", content: "", file: null });
			setSuccess(true);
		} catch (err) {
			console.error("Error creating post:", err);
			setError("Failed to create post. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="create-post">
			<h2>Create a Post</h2>
			{error && <p className="error-message">{error}</p>}
			{success && <p className="success-message">Post created successfully!</p>}
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={newPost.title}
				onChange={handleInputChange}
			/>
			<textarea
				name="content"
				placeholder="Content"
				value={newPost.content}
				onChange={handleInputChange}
			></textarea>
			<input
				type="file"
				name="file"
				accept="image/*,video/*"
				onChange={handleFileChange}
			/>
			<button onClick={handlePostSubmit} disabled={loading}>
				{loading ? "Posting..." : "Post"}
			</button>
		</div>
	);
}

export default CreatePost;
