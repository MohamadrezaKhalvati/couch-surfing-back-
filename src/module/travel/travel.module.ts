import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'

@Module({
	providers: [TravelService],
	controllers: [TravelController],
	imports: [PrismaModule, AuthModule],
})
export class TravelModule {}
