import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class MongoObjectIdValidationPipe implements PipeTransform {
	async transform(value: string | number) {
		if (Types.ObjectId.isValid(value)) {
			return value
		}
		throw new BadRequestException('Id validation failed')
	}
}
