import { connectToDb } from '@utils/database';
import Name from '@models/name';

export const GET = async (request: Request, { params }: { params: Params }) => {
	try {
		await connectToDb();
		const names = await Name.find({ creator: params.id }).populate('creator');
		return new Response(JSON.stringify(names), {
			status: 200,
		});
	} catch (error) {
		return new Response('Failed to fetch names', {
			status: 500,
		});
	}
};
