import { connectToDb } from '@utils/database';
import Name from '@models/name';

export const POST = async (request: Request) => {
	const { userId, name, pronunciation, meaning } = await request.json();

	try {
		await connectToDb();
		const newName = new Name({
			creator: userId,
			name,
			pronunciation,
			meaning,
		});
		await newName.save();
		return new Response(JSON.stringify(newName), { status: 201 });
	} catch (error) {
		return new Response('Failed to add a new name', { status: 500 });
	}
};
