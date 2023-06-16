import { Global, Module } from '@nestjs/common'
import { ControllerExeptionManager } from './exeptions/exeption.manager'
import { EncryptionService } from './services/encryption.service'
import { FslogService } from './services/fslog.service'
import { MockService } from './services/mock.service'

@Global()
@Module({
	providers: [MockService, FslogService, ControllerExeptionManager, EncryptionService],
	exports: [MockService, FslogService, ControllerExeptionManager, EncryptionService],
})
export class SharedModule {}
