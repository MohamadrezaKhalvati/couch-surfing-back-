import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateHostInput } from './dto/create-host.input'
import { DeleteHostInput } from './dto/delete-host.input'
import { ReadHostInput } from './dto/read-host.input'
import { UpdateHostInput } from './dto/update-host.input'

@Injectable()
export class HostService {
	constructor(private prisma: PrismaService) {}

	async createHost(input: CreateHostInput) {}

	async updateHost(input: UpdateHostInput) {}

	async readHost(input: ReadHostInput) {}

	async deleteHost(input: DeleteHostInput) {}
}
