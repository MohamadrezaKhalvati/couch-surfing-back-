import { Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateTravelInput } from './dto/create-travel.input'
import { DeleteTravelInput } from './dto/delete-travel.input'
import { ReadTravelInput } from './dto/read-travel.input'
import { UpdateTravelInput } from './dto/update-travel.input'
import { TravelService } from './travel.service'

@Controller('travel')
export class TravelController {
	constructor(private travelService: TravelService) {}

	@Post('createTravel')
	@ApiOperation({ operationId: 'createTravel' })
	@ApiBody({ type: CreateTravelInput })
	@ApiResponse({ status: 200 })
	async createTravel() {}

	@Post('updateTravel')
	@ApiOperation({ operationId: 'updateTravel' })
	@ApiBody({ type: UpdateTravelInput })
	@ApiResponse({ status: 200 })
	async updateTravel() {}

	@Post('readTravel')
	@ApiOperation({ operationId: 'readTravel' })
	@ApiBody({ type: ReadTravelInput })
	@ApiResponse({ status: 200 })
	async readTravel() {}

	@Post('deleteTravel')
	@ApiOperation({ operationId: 'deleteTravel' })
	@ApiBody({ type: DeleteTravelInput })
	@ApiResponse({ status: 200 })
	async deleteTravel() {}
}
