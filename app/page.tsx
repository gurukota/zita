import Feed from '@components/Feed';

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Discover & Share
				<br className="max-md:hidden" />
				<span className="blue_gradient text-center">Mazita</span>
			</h1>
			<p className="desc text-center">
				Your gateway to uncovering the profound meanings and beautiful
				pronunciations of names
			</p>
			<Feed />
		</section>
	);
};

export default Home;
