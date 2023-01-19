import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/input/pagination.input'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateEventInput } from './dto/create-event.inptu'
import { DeleteEventInput } from './dto/delete-event.input'
import { ReadEventInput } from './dto/read-event.input'
import { UpdateEventInput } from './dto/update-event.input'

@Injectable()
export class EventService {
	readonly readEventSelectType = {
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

	async createEvent(input: CreateEventInput, requesterId: string) {
		const { data } = input
		const location = data.location.toLowerCase()
		await this.authService.verifyUserExistance(requesterId)

		const event = await this.prisma.event.create({
			data: {
				location: location,
				status: data.status,
				description: data.description,
				startDate: data.startDate,
				endDate: data.endDate,
				userId: requesterId,
			},
		})
		return event
	}

	async updateEvent(input: UpdateEventInput) {
		const { data, id } = input

		let dataClause: Prisma.EventUpdateInput = {
			description: data.description,
			endDate: data.endDate,
			location: data.location,
			startDate: data.startDate,
			status: data.startDate,
		}

		dataClause = cleanDeep(dataClause)

		const updatedEvent = await this.prisma.event.update({
			where: {
				id: id,
			},
			data: dataClause,
		})

		return updatedEvent
	}

	async readEvent(input: ReadEventInput) {
		const rawWhere = input.data

		let whereClause: Prisma.EventWhereInput = {
			id: rawWhere.id,
			description: rawWhere.description,
			startDate: rawWhere.startDate,
			endDate: rawWhere.endDate,
			status: rawWhere.status,
			location: rawWhere.location,
			userId: rawWhere.userId,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.event.count({ where: whereClause })
		const entity = this.prisma.event.findMany({
			where: whereClause,
			select: this.readEventSelectType,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})

		return createPaginationResult({ count, entity })
	}

	async deleteEvent(input: DeleteEventInput) {
		const { data } = input
		await this.verifyEventExistance(data.id)

		const deletedEvent = await this.prisma.event.delete({
			where: {
				id: data.id,
			},
		})
		return deletedEvent
	}

	private async verifyEventExistance(id: string) {
		const event = await this.prisma.event.findUnique({ where: { id } })
		if (!event) {
			console.log('err')
		}
		return event
	}
}
