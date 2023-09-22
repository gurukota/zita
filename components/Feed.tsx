'use client';

import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PostCard from './PostCard';

const PostCardList = ({ data }: { data: Post[] }) => {
	return (
		<div className="name_layout">
			{data.map((post) => (
				<PostCard key={post._id} post={post} />
			))}
		</div>
	);
};
const Feed = () => {
	const [searchText, setSearchText] = useState('');

	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e: { target: { value: any } }) => {
		const query = e.target.value;
		setSearchText(query);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/search?name=${searchText}`);
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchNames = async () => {
			const response = await fetch('/api/name');
			const data = await response.json();
			setPosts(data);
		};
		fetchNames();
	}, []);

	return (
		<section className="feed">
			<form className="realtive w-full flex-center" onSubmit={handleSubmit}>
				<div className="relative flex w-full flex-wrap items-stretch">
					<input
						type="text"
						placeholder="Search for a name..."
						value={searchText}
						onChange={handleSearchChange}
						className="search_input peer"
					/>
				</div>
				<button type="button" className="search_btn" onClick={handleSubmit}>
					<AiOutlineSearch className="w-6 h-6" />
				</button>
			</form>
			{posts.length !== 0 ? (
				<PostCardList data={posts} />
			) : (
				<h1 className=" p-24 text-center text-gray-400">
					There are no names!!
				</h1>
			)}
		</section>
	);
};

export default Feed;
