'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Form from '@components/Form';

const EditName = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const postId = searchParams.get('id');
	const [post, setPost] = useState({
		name: '',
		pronunciation: '',
		meaning: '',
	});

	useEffect(() => {
		const getNameDetails = async () => {
			const response = await fetch(`/api/name/${postId}`);
			const data = await response.json();
			setPost({
				name: data.name,
				pronunciation: data.pronunciation,
				meaning: data.meaning,
			});
		};
		if (postId) getNameDetails();
	}, [postId]);
	// eslint-disable-next-line consistent-return
	const editName = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setSubmitting(true);

		if (!postId) return alert('Post ID not found');
		try {
			const response = await fetch(`/api/name/${postId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					name: post.name,
					pronunciation: post.pronunciation,
					meaning: post.meaning,
				}),
			});
			if (response.ok) {
				router.push('/profile');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={editName}
		/>
	);
};

export default EditName;
