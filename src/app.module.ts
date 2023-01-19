import { Module } from '@nestjs/common'
import { AuthModule } from './module/auth/auth.module'
import { EventModule } from './module/event/event.module'
import { HostModule } from './module/host/host.module'
import { PrismaModule } from './module/prisma/prisma.module'
import { TravelModule } from './module/travel/travel.module'
@Module({
	imports: [AuthModule, PrismaModule, EventModule, TravelModule, HostModule],
})
export class AppModule {}
