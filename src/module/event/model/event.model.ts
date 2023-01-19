import { ApiProperty } from '@nestjs/swagger'

export class EventModel {
	@ApiProperty()
	location: string

	@ApiProperty()
	status: string
}
