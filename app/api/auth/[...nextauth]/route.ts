import NextAuth from 'next-auth/next';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { connectToDb } from '@utils/database';
import User from '@models/user';
import { Profile } from 'next-auth';

const handler = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email });
			// eslint-disable-next-line no-param-reassign
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }: { profile?: Profile }) {
			try {
				await connectToDb();
				const userExists = await User.findOne({ email: profile?.email });
				if (!userExists) {
					await User.create({
						email: profile?.email,
						username: profile?.name?.replace(' ', '').toLowerCase(),
						image: profile?.picture,
					});
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
