'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const router = useRouter();

	const handleEdit = async (post: Post) => {
		router.push(`/update-name?id=${post._id}`);
	};

	const handleDelete = async (post: Post) => {
		const hasConfirmed = confirm('Are you sure you want to delete this name.');
		if (hasConfirmed) {
			try {
				await fetch(`/api/name/${post._id?.toString()}`, {
					method: 'DELETE',
				});
				const filteredNames = posts.filter((p: Post) => p._id !== post._id);
				setPosts(filteredNames);
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/names`);
			const data = await response.json();
			setPosts(data);
		};
		if (session?.user.id) fetchPosts();
	}, []);
	return (
		<Profile
			title="My"
			desc="Welcome to your profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
