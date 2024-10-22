import { Global, Module } from '@nestjs/common'
import { ControllerExeptionManager } from './exeptions/exeption.manager'
import { EncryptionService } from './services/encryption.service'
import { FslogService } from './services/fslog.service'

@Global()
@Module({
    providers: [FslogService, ControllerExeptionManager, EncryptionService],
    exports: [FslogService, ControllerExeptionManager, EncryptionService],
})
export class SharedModule {}
