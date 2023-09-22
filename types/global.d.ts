export {};

declare global {
	interface LoginModalProps {
		isOpen: boolean;
		handleClose: () => void;
	}

	interface Providers {
		[key: string]: ProviderInfo;
	}
	interface Params {
		id: string;
		name?: string;
	}

	interface Post {
		_id?: string;
		creator?: Creator;
		name: string;
		pronunciation: string;
		meaning: string;
	}
	interface Creator {
		_id: string;
		email: string;
		image: string;
		username: string;
	}
	interface ProfileProps {
		title: string;
		desc: string;
		data: Post[];
		handleDelete: (post: Post) => Promise<void>;
		handleEdit: (post: Post) => Promise<void>;
	}
	interface PostCardProps {
		post: Post;
		handleDelete?: () => void;
		handleEdit?: () => void;
	}
	interface FormProps {
		type: string;
		post: Post;
		setPost: Dispatch<SetStateAction<Post>>;
		submitting: boolean;
		handleSubmit: (e: { preventDefault: () => void }) => Promise<void>;
	}
}
