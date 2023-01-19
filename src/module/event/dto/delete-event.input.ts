import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteEventData {
	@ApiProperty()
	@IsUUID()
	id: string
}

export class DeleteEventInput {
	@ApiProperty({ type: DeleteEventData })
	@Type(() => DeleteEventData)
	@ValidateNested()
	data: DeleteEventData
}
