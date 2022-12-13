import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(private prismaService: PrismaService) {}

	async createUser() {}

	async updateUser() {}

	async deleteUser() {}

	async readUser() {}
}
