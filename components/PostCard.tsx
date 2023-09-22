'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const PostCard = ({ post, handleEdit, handleDelete }: PostCardProps) => {
	const [download, setDownload] = useState(false);
	const { data: session } = useSession();
	const pathName = usePathname();

	const handleDownload = async () => {
		setDownload(true);
		setTimeout(() => setDownload(false), 3000);

		const response = await fetch(
			`/api/image?name=${post.name}&pronunciation=${post.pronunciation}&meaning=${post.meaning}`,
		);
		const image = await response.blob();
		const anchor = document.createElement('a');
		anchor.href = URL.createObjectURL(image);
		anchor.download = 'image.png';
		anchor.click();
	};

	return (
		<div className="name_card">
			<div className="flex justify-between items-start">
				<div className="flex justify-between items-start">
					<h3 className="font-satoshi font-semibold text-lg blue_gradient">
						{post.name}
					</h3>
					<h3 className="font-satoshi font-thin italic text-xs orange_gradient">
						/ {post.pronunciation} /
					</h3>
				</div>
				<div className="flex justify-end gap-3">
					<div className="copy_btn" onClick={handleDownload}>
						<Image
							src={
								download === true
									? '/assets/icons/tick.svg'
									: '/assets/icons/download.svg'
							}
							alt=""
							width={12}
							height={12}
						/>
					</div>
				</div>
			</div>
			<p className="my-4 font-inter font-semibold text-sm text-gray-700 text-justify">
				{post.meaning}
			</p>
			{session?.user.id === post.creator?._id && pathName === '/profile' && (
				<div className="mt-6 gap-4 flex">
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className="font-inter text-sm orange_gradient cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
			<div className="border-t border-gray-100 mt-2 flex items-center justify-end gap-1">
				<Image
					className="rounded-full object-contain"
					src={post.creator!.image}
					width={24}
					height={24}
					alt="user_image"
				/>
				<h3 className="font-satosh text-xs text-gray-700">
					{post.creator?.username}
				</h3>
			</div>
		</div>
	);
};

export default PostCard;
