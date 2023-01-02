import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma, Role } from '@prisma/client'
import cleanDeep from 'clean-deep'
import hasha from 'hasha'
import { createPaginationResult } from 'src/common/input/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { LoginInput } from './dto/login.input'
import { ReadUserInput } from './dto/read-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { JwtPayloadType } from './guards/token.guard'

@Injectable()
export class AuthService {
	readonlySelectUser = {
		id: true,
		username: true,
		email: true,
		location: true,
		gender: true,
	}
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	async me(userId: string) {
		const user = this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		})
		return user
	}

	async createUser(input: CreateUserInput) {
		const { data } = input
		const { passsord, confirmPassword } = data
		const username = data.username.toLowerCase()
		const email = data.email.toLowerCase()

		await this.verifyIfNewUserIsNotDuplicate(username, email)
		await this.verifyPasswordEqualToConfirmPassword(
			passsord,
			confirmPassword,
		)
		const hashedPassword = await this.createHashedPassword(passsord)

		const user = await this.prisma.user.create({
			data: {
				email: email,
				fullName: data.fullName,
				password: hashedPassword,
				gender: data.gender,
				location: data.location,
				username: username,
				AboutMe: data.aboutMe,
				birthday: data.birthday,
				job: data.job,
				langauge: data.language,
				status: data.status,
			},
			select: this.readonlySelectUser,
		})
		return user
	}

	private async verifyIsEmailNotDuplicate(
		requesterId: string,
		email: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { email: email },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				email = null
				return email
			} else {
				// throw Errors.createClientError({
				// 	code: 4,
				// 	module: ModuleNames.AuthModule,
				// })
				console.log('err')
			}
		} else if (duplicateUser.length > 1) {
			// throw Errors.createClientError({
			// 	code: 4,
			// 	module: ModuleNames.AuthModule,
			// })
			console.log('err')
		}

		return email.toLowerCase()
	}

	async updateUser(input: UpdateUserInput, requesterId: string) {
		const { data, id } = input

		await this.verifyUserExistance(id)
		////

		let myUsername = data.username
		let myEmail = data.email
		let myIsActive = data.isActive
		let hashedPassword = ''

		if (!!data.username) {
			myUsername = await this.verifyIsUsernameNotDuplicate(
				id,
				data.username.toLowerCase(),
			)
		}

		if (!!data.email) {
			myEmail = await this.verifyIsEmailNotDuplicate(id, data.email)
		}

		if (!!data.role || !!data.isActive) {
			await this.verifyAdminUser(requesterId)
		}

		if (!!data.password) {
			if (!data.confirmPassword) {
				// throw Errors.createClientError({
				// 	code: 11,
				// 	module: ModuleNames.AuthModule,
				// })
				console.log('err')
			}
			await this.verifyPasswordEqualToConfirmPassword(
				data.password,
				data.confirmPassword,
			)
			hashedPassword = await this.createHashedPassword(data.password)
		}

		let dataClause: Prisma.UserUpdateInput = {
			fullName: data.fullname,
			email: myEmail,
			username: myUsername,
			role: data.role,
			isActive: myIsActive,
			password: hashedPassword,
			AboutMe: data.aboutMe,
			birthday: data.birthday,
			gender: data.gender,
			job: data.job,
			langauge: data.language,
			location: data.location,
			status: data.status,
		}

		dataClause = cleanDeep(dataClause)

		const updatedUser = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: dataClause,
		})

		return updatedUser
	}

	async deleteUser(input: DeleteUserInput) {
		const { data } = input
		const { id } = data
		const user = await this.verifyUserExistance(id)

		const deletedUser = await this.prisma.user.update({
			where: { id },
			data: { isActive: false },
		})
		return deletedUser
	}

	async readUser(input: ReadUserInput) {
		const rawWhere = input.data
		let whereClause: Prisma.UserWhereInput = {
			id: rawWhere.id,
			isActive: rawWhere.isActive,
			username: rawWhere.username,
			email: rawWhere.email,
			role: rawWhere.role,
			AboutMe: rawWhere.aboutMe,
			birthday: rawWhere.birthday,
			gender: rawWhere.gender,
			job: rawWhere.job,
			langauge: rawWhere.language,
			location: rawWhere.location,
			status: rawWhere.status,
			fullName: { mode: 'insensitive', contains: rawWhere.fullName },
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.user.count({ where: whereClause })
		const entity = this.prisma.user.findMany({
			where: whereClause,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})

		return createPaginationResult({ count, entity })
	}

	async verifyUserExistance(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id } })
		if (!user)
			// throw Errors.createClientError({
			// 	code: 6,
			// 	module: ModuleNames.AuthModule,
			// })
			console.log('err')
		return user
	}

	private async verifyUserForLogin(input: LoginInput) {
		const { data } = input
		const hashedPassword = await this.createHashedPassword(data.password)
		const user = await this.prisma.user.findFirst({
			where: {
				username: data.username.toLowerCase(),
				password: hashedPassword,
			},
		})

		if (!user)
			// throw Errors.createClientError({
			// 	code: 5,
			// 	module: ModuleNames.AuthModule,
			// })
			console.log('err')

		return user
	}

	private async verifyUserIsActive(userId: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				id: userId,
			},
		})
		if (user.isActive) return user
		else {
			// throw Errors.createClientError({
			// 	code: 12,
			// 	module: ModuleNames.AuthModule,
			// })
			console.log('err')
		}
	}

	async logIn(input: LoginInput) {
		const { data } = input

		const user = await this.verifyUserForLogin(input)
		await this.verifyUserIsActive(user.id)

		const payload: JwtPayloadType = {
			id: user.id,
			username: user.username.toLowerCase(),
			role: user.role,
		}

		const token = await this.signPayload(payload)

		return { jwt: token }
	}

	private signPayload(input: PayloadType) {
		return this.jwt.sign(input)
	}
	async verifyIfNewUserIsNotDuplicate(username: string, email: string) {
		if (username) {
			const duplicateUsername = await this.prisma.user.findUnique({
				where: { username },
			})
			if (duplicateUsername) {
				console.log('asda')
			}
		}
		if (email) {
			const duplicateEmail = await this.prisma.user.findUnique({
				where: { email },
			})
			if (duplicateEmail) {
				console.log('asdass')
			}
		}
	}

	private async verifyIsEmailIsNotDuplicate(
		requesterId: string,
		email: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { email: email },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				email = null
				return email
			} else {
				console.log('asdsad')
			}
		} else if (duplicateUser.length > 1) {
			console.log('asda')
		}

		return email.toLowerCase()
	}

	private async createHashedPassword(mainPassword: string) {
		return await hasha.async(mainPassword, { algorithm: 'sha1' })
	}

	private async verifyIsUsernameNotDuplicate(
		requesterId: string,
		username: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { username },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				username = null
				return username
			} else {
				console.log('sdfsfd')
			}
		} else if (duplicateUser.length > 1) {
			console.log('sdfsdf')
		}
		return username.toLowerCase()
	}

	private async verifyPasswordEqualToConfirmPassword(
		password,
		confirmPassword,
	) {}

	private async verifyAdminUser(requesterId: string) {
		const foundUser = await this.prisma.user.findFirst({
			where: {
				id: requesterId,
				role: Role.Admin,
			},
		})

		if (!foundUser)
			// throw Errors.createClientError({
			// 	code: 2,
			// 	module: ModuleNames.EventModule,
			// })
			console.log('err')
	}
}

type PayloadType = {
	id: string
	username: string
	role: string
}
