import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class UserModel {
	@ApiProperty()
	username: string;

	@ApiProperty()
	fullName: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	gender: Gender;

	@ApiProperty()
	location: string;

	@ApiProperty()
	userProfuleUrl: string;

	@ApiProperty()
	createdDate: Date;

	@ApiProperty()
	updatedDate: Date;
}
