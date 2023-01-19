import { Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { IsLoggedIn } from '../auth/guards/is-logged-in.guard'
import { CreateHostInput } from './dto/create-host.input'
import { DeleteHostInput } from './dto/delete-host.input'
import { ReadHostInput } from './dto/read-host.input'
import { UpdateHostInput } from './dto/update-host.input'
import { HostService } from './host.service'

@Controller('host')
export class HostController {
	constructor(private hostService: HostService) {}

	@Post('createHost')
	@ApiOperation({ operationId: 'createHost' })
	@ApiBody({ type: CreateHostInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async createHost() {}

	@Post('updateHost')
	@ApiOperation({ operationId: 'updateHost' })
	@ApiBody({ type: UpdateHostInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async updateHost() {}

	@Post('readHost')
	@ApiOperation({ operationId: 'readHost' })
	@ApiBody({ type: ReadHostInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async readHost() {}

	@Post('deleteHost')
	@ApiOperation({ operationId: 'deleteHost' })
	@ApiBody({ type: DeleteHostInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async deleteHost() {}
}
