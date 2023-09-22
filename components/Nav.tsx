'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import LoginModal from './LoginModal';

const Nav = () => {
	const { data: session } = useSession();
	const [toogleDropdown, setToogleDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<nav className="flex-between w-full mb-16 pt-3">
				<Link href="/" className="flex gap-2 flex-center">
					<Image
						src="/assets/images/logo.svg"
						height={37}
						width={37}
						alt="logo"
						className="object-contain"
					/>
					<p className="logo_text">ZITA</p>
				</Link>
				{/* Desktop Navigation */}
				<div className="sm:flex hidden">
					{session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<Link href="/add-name" className="black_btn">
								Add Name
							</Link>
							<button
								type="button"
								className="outline_btn"
								onClick={() =>
									signOut({ callbackUrl: process.env.NEXTAUTH_URL_INTERNAL })
								}
							>
								Sign Out
							</button>
							<Link href="/profile">
								<Image
									src={session?.user.image!}
									height={37}
									width={37}
									alt="profile"
									className="rounded-full"
								/>
							</Link>
						</div>
					) : (
						<button
							type="button"
							className="black_btn"
							onClick={() => setShowModal((prev) => !prev)}
						>
							Sign In
						</button>
					)}
				</div>
				{/* Mobile Navigation */}
				<div className="sm:hidden flex relative">
					{session?.user ? (
						<div className="flex">
							<Image
								src={session?.user.image!}
								width={37}
								height={37}
								alt="profile"
								className="rounded-full"
								onClick={() => setToogleDropdown((prev) => !prev)}
							/>
							{toogleDropdown && (
								<div className="dropdown">
									<Link
										href="/profile"
										className="dropwdown_link"
										onClick={() => setToogleDropdown(false)}
									>
										My Profile
									</Link>
									<Link
										href="/add-name"
										className="dropwdown_link"
										onClick={() => setToogleDropdown(false)}
									>
										Add Name
									</Link>
									<button
										type="button"
										onClick={() =>
											signOut({
												callbackUrl: process.env.NEXTAUTH_URL,
											})
										}
										className="mt-5 w-full black_btn"
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<button
							type="button"
							onClick={() => setShowModal((prev) => !prev)}
							className="black_btn"
						>
							Sign In
						</button>
					)}
				</div>
			</nav>
			<LoginModal isOpen={showModal} handleClose={() => setShowModal(false)} />
		</>
	);
};

export default Nav;
