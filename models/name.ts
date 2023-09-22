import { Schema, model, models } from 'mongoose';

const nameSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: [true, 'Name is required!'],
	},
	pronunciation: {
		type: String,
		required: [true, 'Pronunciation is required!'],
	},
	meaning: {
		type: String,
		required: [true, 'Meaning is required!'],
	},
});
const Name = models.Name || model('Name', nameSchema);
export default Name;
