import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteHostData {
	@ApiProperty()
	@IsUUID()
	id: string
}

export class DeleteHostInput {
	@ApiProperty()
	@Type(() => DeleteHostData)
	@ValidateNested()
	data: DeleteHostData
}
