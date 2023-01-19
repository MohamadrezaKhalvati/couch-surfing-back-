import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { IsLoggedIn } from '../auth/guards/is-logged-in.guard'
import { CreateEventInput } from './dto/create-event.inptu'
import { DeleteEventInput } from './dto/delete-event.input'
import { ReadEventInput } from './dto/read-event.input'
import { UpdateEventInput } from './dto/update-event.input'
import { EventService } from './event.service'

@Controller('event')
export class EventController {
	constructor(private eventService: EventService) {}

	@Post('createEvent')
	@ApiOperation({ operationId: 'createEvent' })
	@ApiBody({ type: CreateEventInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async createEvent() {}

	@Post('updateEvent')
	@ApiOperation({ operationId: 'updateEvent' })
	@ApiBody({ type: UpdateEventInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async updateEvent() {}

	@Get('readEvent')
	@ApiOperation({ operationId: 'readEvent' })
	@ApiBody({ type: ReadEventInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async readEvent() {}

	@Post('deleteEvent')
	@ApiOperation({ operationId: 'deleteEvent' })
	@ApiBody({ type: DeleteEventInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async deleteEvent() {}
}
