import { ApiProperty } from '@nestjs/swagger'
import { Gender } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator'
class CreateUserData {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	confirmPassword: string

	@ApiProperty()
	@IsString()
	fullName: string

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty({ enum: Gender })
	@IsEnum(Gender)
	gender: Gender

	@ApiProperty()
	@IsString()
	location: string

	@ApiProperty()
	@IsString()
	job: string

	@ApiProperty()
	@IsString()
	language: string

	@ApiProperty()
	@IsString()
	status: string

	@ApiProperty()
	@IsString()
	aboutMe: string

	@ApiProperty()
	@IsDateString()
	birthday: Date
}

export class CreateUserInput {
	@ApiProperty({ type: CreateUserData })
	@Type(() => CreateUserData)
	data: CreateUserData
}
