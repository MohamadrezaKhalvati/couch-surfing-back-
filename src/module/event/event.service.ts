import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateEventInput } from './dto/create-event.inptu'
import { DeleteEventInput } from './dto/delete-event.input'
import { ReadEventInput } from './dto/read-event.input'
import { UpdateEventInput } from './dto/update-event.input'

@Injectable()
export class EventService {
	constructor(private prisma: PrismaService) {}

	async createEvent(input: CreateEventInput) {}

	async updateEvent(input: UpdateEventInput) {}

	async readEvent(input: ReadEventInput) {}

	async deleteEvent(input: DeleteEventInput) {}
}
