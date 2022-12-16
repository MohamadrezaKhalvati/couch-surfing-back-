import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Gender, Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { PaginationData } from 'src/common/input/pagination.input'
import { SortByData } from 'src/common/input/sort-by.input'

class ReadUserData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	fullName: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	location: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	username?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional({ enum: Gender })
	@IsOptional()
	@IsEnum(Gender)
	gender?: Gender

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional({ enum: Role })
	@IsOptional()
	@IsEnum(Role)
	role?: Role
}

export class ReadUserInput {
	@ApiProperty({ type: ReadUserData })
	@Type(() => ReadUserData)
	@ValidateNested()
	data: ReadUserData

	@ApiPropertyOptional({ type: PaginationData })
	@IsOptional()
	@Type(() => PaginationData)
	@ValidateNested()
	pagination?: PaginationData

	@ApiPropertyOptional({ type: SortByData })
	@Type(() => SortByData)
	@ValidateNested()
	sortyBy?: SortByData
}
