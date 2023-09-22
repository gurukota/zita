import Name from '@models/name';
import { connectToDb } from '@utils/database';

export const GET = async (request: Request, { params }: { params: Params }) => {
	try {
		await connectToDb();
		const name = await Name.findById(params.id).populate('creator');
		if (!name) return new Response('Name not found', { status: 404 });
		return new Response(JSON.stringify(name), { status: 200 });
	} catch (error) {
		return new Response('Name not found', { status: 500 });
	}
};

export const PATCH = async (req: Request, { params }: { params: Params }) => {
	const { name, pronunciation, meaning } = await req.json();
	try {
		await connectToDb();
		const existingName = await Name.findById(params.id);
		if (!name) return new Response('Name not found', { status: 404 });
		existingName.name = name;
		existingName.pronunciation = pronunciation;
		existingName.meaning = meaning;
		await existingName.save();
		return new Response(JSON.stringify(existingName), { status: 200 });
	} catch (error) {
		return new Response('Failed to update name', { status: 500 });
	}
};

export const DELETE = async (
	request: Request,
	{ params }: { params: Params },
) => {
	try {
		await connectToDb();
		await Name.findByIdAndRemove(params.id);
		return new Response('Name deleted successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to delete name', { status: 500 });
	}
};
