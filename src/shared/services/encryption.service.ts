import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

@Injectable()
export class EncryptionService {
    private saltRounds = 12

    async hashValue(value: string | Buffer) {
        return await hash(value, this.saltRounds)
    }

    async validateHash(value: string | Buffer, hashValue: string) {
        return await compare(value, hashValue)
    }
}
