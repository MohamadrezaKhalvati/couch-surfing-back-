import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDateString,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'

class UpdateHostData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	location?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	status?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	startDate?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	endDate?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	description?: string
}

export class UpdateHostInput {
	@ApiPropertyOptional({ type: UpdateHostData })
	@Type(() => UpdateHostData)
	@ValidateNested()
	data: UpdateHostData

	@ApiProperty()
	@IsString()
	id: string
}
