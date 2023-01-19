import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'

@Module({
	providers: [TravelService],
	controllers: [TravelController],
	imports: [PrismaModule],
})
export class TravelModule {}
