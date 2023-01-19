import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/input/pagination.input'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTravelInput } from './dto/create-travel.input'
import { DeleteTravelInput } from './dto/delete-travel.input'
import { ReadTravelInput } from './dto/read-travel.input'
import { UpdateTravelInput } from './dto/update-travel.input'

@Injectable()
export class TravelService {
	readonly readTravelSelectType = {
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

	async createTravel(input: CreateTravelInput, requesterId: string) {
		const { data } = input
		const location = data.location.toLowerCase()
		await this.authService.verifyUserExistance(requesterId)

		const travel = await this.prisma.travel.create({
			data: {
				location: location,
				status: data.status,
				description: data.description,
				startDate: data.startDate,
				endDate: data.endDate,
				userId: requesterId,
			},
		})
		return travel
	}

	async updateTravel(input: UpdateTravelInput) {
		const { data, id } = input

		let dataClause: Prisma.TravelUpdateInput = {
			endDate: data.endDate,
			location: data.location,
			startDate: data.startDate,
			status: data.startDate,
			description: data.description,
		}

		dataClause = cleanDeep(dataClause)

		const updatedTravel = await this.prisma.travel.update({
			where: {
				id: id,
			},
			data: dataClause,
		})

		return updatedTravel
	}

	async readTravel(input: ReadTravelInput) {
		const rawWhere = input.data

		let whereClause: Prisma.TravelWhereInput = {
			id: rawWhere.id,
			description: rawWhere.description,
			startDate: rawWhere.startDate,
			endDate: rawWhere.endDate,
			status: rawWhere.status,
			location: rawWhere.location,
			userId: rawWhere.userId,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.travel.count({ where: whereClause })
		const entity = this.prisma.travel.findMany({
			where: whereClause,
			select: this.readTravelSelectType,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})

		return createPaginationResult({ count, entity })
	}

	async deleteTravel(input: DeleteTravelInput) {
		const { data } = input
		await this.verfiyTravelExistance(data.id)

		const deletedTravel = await this.prisma.travel.delete({
			where: { id: data.id },
		})

		return deletedTravel
	}

	private async verfiyTravelExistance(id: string) {
		const travel = await this.prisma.travel.findUnique({ where: { id } })
		if (!travel) {
			console.log('err')
		}
		return travel
	}
}
