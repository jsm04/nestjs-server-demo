import { Schema } from 'mongoose'
import { User } from '../user.interface'

export class UserMongoEntity {
	public static get schema() {
		return new Schema<User>({
			sex: { type: String, required: true },
			firstname: { type: String, required: true },
			lastname: { type: String, required: true },
			password: { type: String, required: true },
			username: { type: String, required: true, unique: true },
			email: { type: String, required: true, unique: true },
			age: { type: Number, required: true },
		})
	}

	public static get collection() {
		return 'Users'
	}
}
