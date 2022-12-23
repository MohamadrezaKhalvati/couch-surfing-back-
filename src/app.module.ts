import { Module } from '@nestjs/common'
import { AuthModule } from './module/auth/auth.module'
import { PrismaModule } from './module/prisma/prisma.module'
@Module({
	imports: [AuthModule, PrismaModule],
})
export class AppModule {}
