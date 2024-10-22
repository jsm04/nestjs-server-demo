import { Document, Schema } from 'mongoose'
import { availableRoles } from '../../../../shared/constants/constants'
import { User } from '../user.interface'

export type UserDocument = User & Document

export class UserMongoEntity {
    public static get schema() {
        return new Schema<User>(
            {
                sex: { type: String, required: true },
                firstname: { type: String, required: true },
                lastname: { type: String, required: true },
                password: { type: String, required: true, select: false },
                username: { type: String, required: true, unique: true },
                email: { type: String, required: true, unique: true },
                age: { type: Number, required: true },
                role: { type: String, enum: [...availableRoles], default: 'user' },
            },
            { timestamps: true },
        )
    }

    public static get collection() {
        return 'Users'
    }
}
