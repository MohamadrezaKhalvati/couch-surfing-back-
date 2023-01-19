import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsString, ValidateNested } from 'class-validator'

class CreateHostData {
	@ApiProperty()
	@IsString()
	location: string

	@ApiProperty()
	@IsDateString()
	startDate: Date

	@ApiProperty()
	@IsDateString()
	endDate: Date

	@ApiProperty()
	@IsString()
	status: string

	@ApiProperty()
	@IsString()
	description: string
}

export class CreateHostInput {
	@ApiProperty({ type: CreateHostData })
	@Type(() => CreateHostData)
	@ValidateNested()
	data: CreateHostData
}
