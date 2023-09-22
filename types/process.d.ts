declare namespace NodeJS {
	export interface ProcessEnv {
		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;
		NEXTAUTH_URL_INTERNAL: string;
		MONGODB_URI: string;
		FACEBOOK_CLIENT_ID: string;
		FACEBOOK_CLIENT_SECRET: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
	}
}
