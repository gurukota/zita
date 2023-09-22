'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Form from '@components/Form';

const AddName = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		name: '',
		pronunciation: '',
		meaning: '',
	});
	const addName = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch('/api/name/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id,
					name: post.name,
					pronunciation: post.pronunciation,
					meaning: post.meaning,
				}),
			});
			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Add"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={addName}
		/>
	);
};

export default AddName;
