import { Global, Module } from '@nestjs/common'
import { CustomLogger } from './custom-logger.service'
import { MockService } from './mock.service'

@Global()
@Module({
	providers: [MockService, CustomLogger],
	exports: [MockService, CustomLogger],
})
export class SharedModule {}
