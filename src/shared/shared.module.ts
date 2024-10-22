import { Global, Module } from '@nestjs/common'
import { ControllerExceptionManager } from './exceptions/exception.manager'
import { EncryptionService } from './services/encryption.service'
import { FilesystemLoggerService } from './services/filesyslog.service'

@Global()
@Module({
    providers: [FilesystemLoggerService, ControllerExceptionManager, EncryptionService],
    exports: [FilesystemLoggerService, ControllerExceptionManager, EncryptionService],
})
export class SharedModule {}
