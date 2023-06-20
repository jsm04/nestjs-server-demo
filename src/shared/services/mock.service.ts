import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { User } from '../../modules/Users/entities/user.interface'

@Injectable()
export class MockService {
	createTestUser() {
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
}
