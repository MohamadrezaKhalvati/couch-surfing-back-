import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDateString,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { PaginationData } from 'src/common/input/pagination.input'
import { SortByData } from 'src/common/input/sort-by.input'

class ReadEventData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	location: string

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
	@IsString()
	description?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	userId: string
}

export class ReadEventInput {
	@ApiProperty({ type: ReadEventData })
	@Type(() => ReadEventData)
	@ValidateNested()
	data: ReadEventData

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
