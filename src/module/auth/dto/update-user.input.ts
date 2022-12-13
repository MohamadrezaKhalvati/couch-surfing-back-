import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsString, ValidateNested } from 'class-validator'

export class UpdateUserData {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	fullname: string

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	phoneNumber: string
}

export class UpdateUserInput {
	@ApiProperty({ type: UpdateUserData })
	@Type(() => UpdateUserData)
	@ValidateNested()
	data: UpdateUserData
}
