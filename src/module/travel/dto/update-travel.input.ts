import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDateString,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'

class UpdateTravelData {
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

export class UpdateTravelInput {
	@ApiPropertyOptional({ type: UpdateTravelData })
	@Type(() => UpdateTravelData)
	@ValidateNested()
	data: UpdateTravelData

	@ApiProperty()
	@IsString()
	id: string
}
