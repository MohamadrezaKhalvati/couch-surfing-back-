import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class CreateHostData {}

export class CreateHostInput {
	@ApiProperty({ type: CreateHostData })
	@Type(() => CreateHostData)
	@ValidateNested()
	data: CreateHostData
}
