import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [
		PrismaModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET_TOKEN,
			signOptions: { expiresIn: process.env.JWT_EXPIRATION_DATE },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
