import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Zita',
	description: 'Discover the meaning of your naame',
	icons: {
		icon: '/favicon.ico',
	},
};
const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<body>
			<Provider session={undefined}>
				<div className="main">
					<div className="gradient" />
				</div>

				<main className="app">
					<Nav />
					{children}
				</main>
			</Provider>
		</body>
	</html>
);

export default RootLayout;
