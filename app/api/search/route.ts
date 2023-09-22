import { connectToDb } from '@utils/database';
import Name from '@models/name';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	try {
		await connectToDb();
		const { searchParams } = new URL(request.url);
		const search = searchParams.get('name');
		const names = await Name.find({
			name: { $regex: search, $options: 'i' },
		}).populate('creator');
		return new Response(JSON.stringify(names), {
			status: 200,
		});
	} catch (error) {
		return new Response('Failed to fetch names', {
			status: 500,
		});
	}
};
