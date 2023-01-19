import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { PaginationData } from 'src/common/input/pagination.input'
import { SortByData } from 'src/common/input/sort-by.input'

class ReadHostData {}

export class ReadHostInput {
	@ApiProperty({ type: ReadHostData })
	@Type(() => ReadHostData)
	@ValidateNested()
	data: ReadHostData

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
