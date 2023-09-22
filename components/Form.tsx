import React from 'react';
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Name</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing names with the world, and let your imagination
				run wild with any AI-powered Platform.
			</p>
			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Add Name
					</span>
					<input
						value={post.name}
						onChange={(e) => setPost({ ...post, name: e.target.value })}
						placeholder="Write the title of the name here..."
						required
						className="form_input"
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Pronounciation
					</span>
					<input
						value={post.pronunciation}
						onChange={(e) =>
							setPost({ ...post, pronunciation: e.target.value })
						}
						placeholder="Write the title of the name here..."
						className="form_input"
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Meaning
					</span>
					<textarea
						value={post.meaning}
						onChange={(e) => setPost({ ...post, meaning: e.target.value })}
						placeholder="Write the meaning of the name here..."
						required
						className="form_textarea"
					/>
				</label>
				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/profile" className="text-gray-500 text-sm">
						Cancel
					</Link>
					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
