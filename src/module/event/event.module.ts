import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { EventController } from './event.controller'
import { EventService } from './event.service'

@Module({
	controllers: [EventController],
	providers: [EventService],
	imports: [PrismaModule, AuthModule],
})
export class EventModule {}
