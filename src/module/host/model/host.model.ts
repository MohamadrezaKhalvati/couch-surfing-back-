import { ApiProperty } from '@nestjs/swagger'

export class HostModel {
	@ApiProperty()
	location: string

	@ApiProperty()
	status: string
}
