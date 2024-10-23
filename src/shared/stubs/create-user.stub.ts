import { faker } from '@faker-js/faker'
import { User } from '../../modules/Users/entities/user.interface'

export const createUserStub = () => {
    const user: User = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: Number(faker.number.int({min: 13, max: 127})),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        sex: faker.person.sex(),
        password: faker.internet.password(),
        role: 'user',
    }
    return user
}
