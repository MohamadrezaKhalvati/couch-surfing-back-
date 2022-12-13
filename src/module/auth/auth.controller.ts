import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { LoginInput } from './dto/login.input'
import { ReadUserInput } from './dto/read-user.input'
import { UpdateUserInput } from './dto/update-user.input'

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
	async updateUser(@Body() input: UpdateUserInput) {
		return await this.authService.updateUser(input)
	}

	@Post('deleteUser')
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiBody({ type: DeleteUserInput })
	@ApiResponse({ status: 200 })
	async deleteUser(@Body() input: DeleteUserInput) {
		return await this.authService.deleteUser(input)
	}

	@Post('readUser')
	@ApiOperation({ operationId: 'readUser' })
	@ApiBody({ type: ReadUserInput })
	@ApiResponse({ status: 200 })
	async readUser() {}

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
