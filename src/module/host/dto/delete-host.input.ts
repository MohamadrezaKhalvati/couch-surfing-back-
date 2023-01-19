import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteHostData {
	@ApiProperty()
	@IsUUID()
	id: string
}

export class DeleteHostInput {
	@ApiProperty()
	@IsUUID()
	@ValidateNested()
	data: DeleteHostData
}
