import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class CreateEventData {}

export class CreateEventInput {
	@ApiProperty({ type: CreateEventData })
	@Type(() => CreateEventData)
	@ValidateNested()
	data: CreateEventData
}
