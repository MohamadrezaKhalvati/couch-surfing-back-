import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

class UpdateHostData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	location?: string
}

export class UpdateHostInput {
	@ApiPropertyOptional({ type: UpdateHostData })
	@Type(() => UpdateHostData)
	@ValidateNested()
	data: UpdateHostData
}
