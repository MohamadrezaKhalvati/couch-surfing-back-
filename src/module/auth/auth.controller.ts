import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { GetUserId } from './decorator/get-user-id.decorator'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { LoginInput } from './dto/login.input'
import { ReadUserInput } from './dto/read-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { IsLoggedIn } from './guards/is-logged-in.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('createUser')
	@ApiOperation({ operationId: 'createUser' })
	@ApiBody({ type: CreateUserInput })
	@ApiResponse({ status: 200 })
	async createUser(@Body() input: CreateUserInput) {
		return await this.authService.createUser(input)
	}

	@Post('updateUser')
	@ApiOperation({ operationId: 'updateUser' })
	@ApiBody({ type: UpdateUserInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async updateUser(
		@Body() input: UpdateUserInput,
		@GetUserId() requesterId: string,
	) {
		return await this.authService.updateUser(input, requesterId)
	}

	@Post('deleteUser')
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiBody({ type: DeleteUserInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async deleteUser(@Body() input: DeleteUserInput) {
		return await this.authService.deleteUser(input)
	}

	@Get('readUser')
	@ApiOperation({ operationId: 'readUser' })
	@ApiBody({ type: ReadUserInput })
	@ApiResponse({ status: 200 })
	@UseGuards(IsLoggedIn)
	async readUser(@Body() input: ReadUserInput) {
		return await this.authService.readUser(input)
	}

	@Post('login')
	@ApiOperation({ operationId: 'login' })
	@ApiBody({ type: LoginInput })
	@ApiResponse({ status: 200 })
	async login(@Body() input: LoginInput) {
		return await this.authService.logIn(input)
	}

	async changePassword() {}

	async forgetPassword() {}

	async verifyForgetPasswordCode() {}

	async changePasswordWithForgetPasswordCode() {}
}
