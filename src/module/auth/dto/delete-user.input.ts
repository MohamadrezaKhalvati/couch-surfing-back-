import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteUserData {
	@ApiProperty()
	@IsUUID()
	id: string
}

export class DeleteUserInput {
	@ApiProperty({ type: DeleteUserData })
	@Type(() => DeleteUserData)
	@ValidateNested()
	data: DeleteUserData
}
