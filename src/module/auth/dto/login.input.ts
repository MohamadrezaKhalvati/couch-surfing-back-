import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class logInData {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string
}

export class LoginInput {
	@ApiProperty({ type: logInData })
	@Type(() => logInData)
	@ValidateNested()
	data: logInData
}
