import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Gender, Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'

export class UpdateUserData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	username?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsString()
	phoneNumber?: string

	@ApiPropertyOptional({ enum: Role, nullable: true })
	@IsOptional()
	@IsEnum(Role)
	role?: Role

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	password?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	birthday?: Date

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	location?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	confirmPassword?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	job?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	status?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	aboutMe?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	language?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	gender: Gender
}

export class UpdateUserInput {
	@ApiPropertyOptional({ type: UpdateUserData })
	@Type(() => UpdateUserData)
	@ValidateNested()
	data: UpdateUserData

	@ApiProperty()
	@IsString()
	id: string
}
