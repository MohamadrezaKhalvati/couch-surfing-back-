import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteTravelData {
	@ApiProperty()
	@IsUUID()
	id: string
}

export class DeleteTravelInput {
	@ApiProperty()
	@Type(() => DeleteTravelData)
	@ValidateNested()
	data: DeleteTravelData
}
