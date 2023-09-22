import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

const LoginModal = ({ isOpen, handleClose }: LoginModalProps) => {
	if (!isOpen) return null;

	const [providers, setProviders] = useState<Providers | null>(null);
	useEffect(() => {
		const setUpProvider = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProvider();
	}, []);

	return (
		<div className="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-white w-96 p-2 rounded-md">
				<div className="flex justify-between items-center border-b">
					<h3 className="py-4 px-4 text-base font-semibold text-gray-900 lg:text-xl">
						Sign in
					</h3>
					<button
						type="button"
						className="text-gray-400 hover:bg-gray-200  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
						onClick={() => handleClose()}
					>
						<AiOutlineClose className="w-6 h-6" />
					</button>
				</div>
				<div className="py-6 mx-4 flex flex-col space-y-4">
					<p className="text-sm font-normal text-gray-400 py-4">
						Sign-in using existing accounts.
					</p>
					{providers &&
						Object.values(providers).map((provider) => (
							<button
								type="button"
								key={provider.name}
								onClick={() => signIn(provider.id)}
								className="flex py-2 bg-gray-50 hover:bg-gray-100 hover:shadow group rounded-lg text-black font-bold"
							>
								{provider.name === 'Facebook' ? (
									<BsFacebook className="w-6 h-6 mx-3" />
								) : (
									<FcGoogle className="w-6 h-6 mx-3" />
								)}
								<span>{provider.name}</span>
							</button>
						))}
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
