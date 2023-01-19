import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { HostController } from './host.controller'
import { HostService } from './host.service'

@Module({
	providers: [HostService],
	controllers: [HostController],
	imports: [PrismaModule],
})
export class HostModule {}
