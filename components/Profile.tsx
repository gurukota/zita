'use client';

import PostCard from '@components/PostCard';

const Profile = ({
	title,
	desc,
	data,
	handleDelete,
	handleEdit,
}: ProfileProps) => {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{title}</span> Profile
			</h1>
			<p className="desc text-left">{desc}</p>
			<div className="mt-16 name_layout">
				{data.map((post) => (
					<PostCard
						key={post._id}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	);
};

export default Profile;
