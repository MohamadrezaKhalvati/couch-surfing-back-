import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class CreateTravelData {}

export class CreateTravelInput {
	@ApiProperty({ type: CreateTravelData })
	@Type(() => CreateTravelData)
	@ValidateNested()
	data: CreateTravelData
}
