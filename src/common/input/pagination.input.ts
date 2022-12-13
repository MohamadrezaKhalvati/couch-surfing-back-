import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class PaginationData {
	@ApiPropertyOptional({ default: 50 })
	@IsOptional()
	@IsNumber()
	take?: number

	@ApiPropertyOptional({ default: 0 })
	@IsOptional()
	@IsNumber()
	skip?: number

	convertToPrismaFilter?() {
		return {
			take: this.take,
			skip: this.skip,
		}
	}
}
