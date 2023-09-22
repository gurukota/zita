import mongoose, { ConnectOptions } from 'mongoose';

let isConnected: boolean = false;

export const connectToDb = async () => {
	mongoose.set('strictQuery', true);
	if (isConnected) {
		console.log('MongoDB is already connected');
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'zita',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);
		isConnected = true;
		console.log('Mongo db is connected');
	} catch (error) {
		console.log(error);
	}
};
