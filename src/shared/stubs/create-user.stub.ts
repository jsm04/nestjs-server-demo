import { faker } from '@faker-js/faker'
import { User } from '../../modules/Users/entities/user.interface'

export const createUserStub = () => {
	const user: User = {
		firstname: faker.name.firstName(),
		lastname: faker.name.lastName(),
		age: Number(faker.random.numeric(2)),
		email: faker.internet.email(),
		username: faker.internet.userName(),
		sex: faker.name.sex(),
		password: faker.internet.password(),
		role: 'user',
	}
	return user
}

