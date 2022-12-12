import { Module } from '@nestjs/common';
import { AuthController } from './module/auth/auth.controller';
import { AuthModule } from './module/auth/auth.module';
import { AuthService } from './module/auth/auth.service';
import { PrismaModule } from './module/prisma/prisma.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AppModule {}
