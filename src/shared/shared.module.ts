import { Global, Module } from '@nestjs/common'
import { ExceptionManager } from './exceptions/exception.manager'
import { EncryptionService } from './services/encryption.service'
import { FilesystemLoggerService } from './services/filesyslog.service'

@Global()
@Module({
    providers: [FilesystemLoggerService, ExceptionManager, EncryptionService],
    exports: [FilesystemLoggerService, ExceptionManager, EncryptionService],
})
export class SharedModule {}
