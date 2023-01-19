import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsString, ValidateNested } from 'class-validator'

class CreateTravelData {
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

export class CreateTravelInput {
	@ApiProperty({ type: CreateTravelData })
	@Type(() => CreateTravelData)
	@ValidateNested()
	data: CreateTravelData
}
