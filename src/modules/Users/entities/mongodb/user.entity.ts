import { Document, Schema } from 'mongoose'
import { AVAILABLE_ROLES } from '../../../../shared/constants/constants'
import { User } from '../user.interface'

export type UserDocument = User & Document

export class MongodbUserEntity {
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
                role: { type: String, enum: [...AVAILABLE_ROLES], default: 'user' },
            },
            { timestamps: true },
        )
    }

    public static get collection() {
        return 'Users'
    }
}
