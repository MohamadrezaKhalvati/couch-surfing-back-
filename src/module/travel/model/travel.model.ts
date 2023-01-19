import { ApiProperty } from '@nestjs/swagger'

export class TravelModel {
	@ApiProperty()
	location: string

	@ApiProperty()
	status: string
}
