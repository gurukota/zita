import { connectToDb } from '@utils/database';
import Name from '@models/name';

export const GET = async () => {
	try {
		await connectToDb();
		const names = await Name.find({}).populate('creator');
		return new Response(JSON.stringify(names), {
			status: 200,
		});
	} catch (error) {
		return new Response('Failed to fetch names', {
			status: 500,
		});
	}
};
