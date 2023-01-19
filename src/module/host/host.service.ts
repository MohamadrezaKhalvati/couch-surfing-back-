import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/input/pagination.input'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateHostInput } from './dto/create-host.input'
import { DeleteHostInput } from './dto/delete-host.input'
import { ReadHostInput } from './dto/read-host.input'
import { UpdateHostInput } from './dto/update-host.input'

@Injectable()
export class HostService {
	readonly readHostSelectType = {
		description: true,
		endDate: true,
		id: true,
		location: true,
		startDate: true,
		User: true,
	}
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async createHost(input: CreateHostInput, requesterId: string) {
		const { data } = input
		const location = data.location.toLowerCase()
		await this.authService.verifyUserExistance(requesterId)

		const host = await this.prisma.host.create({
			data: {
				location: location,
				status: data.status,
				description: data.description,
				startDate: data.startDate,
				endDate: data.endDate,
				userId: requesterId,
			},
		})
		return host
	}

	async updateHost(input: UpdateHostInput) {
		const { data, id } = input

		let dataClause: Prisma.HostUpdateInput = {
			description: data.description,
			endDate: data.endDate,
			location: data.location,
			startDate: data.startDate,
			status: data.startDate,
		}

		dataClause = cleanDeep(dataClause)

		const updatedHost = await this.prisma.host.update({
			where: {
				id: id,
			},
			data: dataClause,
		})

		return updatedHost
	}

	async readHost(input: ReadHostInput) {
		const rawWhere = input.data

		let whereClause: Prisma.HostWhereInput = {
			id: rawWhere.id,
			description: rawWhere.description,
			startDate: rawWhere.startDate,
			endDate: rawWhere.endDate,
			status: rawWhere.status,
			location: rawWhere.location,
			userId: rawWhere.userId,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.host.count({ where: whereClause })
		const entity = this.prisma.host.findMany({
			where: whereClause,
			select: this.readHostSelectType,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})

		return createPaginationResult({ count, entity })
	}

	async deleteHost(input: DeleteHostInput) {
		const { data } = input
		await this.verifyHostExistance(data.id)

		const deletedHost = await this.prisma.host.delete({
			where: {
				id: data.id,
			},
		})
		return deletedHost
	}

	private async verifyHostExistance(id: string) {
		const host = await this.prisma.host.findUnique({ where: { id: id } })
		if (!host) {
			console.log('err')
		}
		return host
	}
}
