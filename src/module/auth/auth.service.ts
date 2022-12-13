import { Injectable } from '@nestjs/common'
import hasha from 'hasha'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { LoginInput } from './dto/login.input'
import { ReadUserInput } from './dto/read-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async createUser(input: CreateUserInput) {
		const { data } = input
		const { passsord, confirmPassword } = data
		const username = data.username.toLowerCase()
		const email = data.email.toLowerCase()

		await this.verifyIfNewUserIsNotDuplicate(username, email)
		await this.verifyPasswordEqualToConfirmPassword(passsord, confirmPassword)
		const hashedPassword = await this.createHashedPassword(passsord)

		const user = await this.prisma.user.create({
			data: {
				email: email,
				fullName: data.fullName,
				password: hashedPassword,
				gender: data.gender,
				location: data.location,
				username: username,
			},
		})
		return user
	}

	async updateUser(input: UpdateUserInput) {}

	async deleteUser(input: DeleteUserInput) {}

	async readUser(input: ReadUserInput) {}

	async verifyUseExistance() {}

	async logIn(input: LoginInput) {}

	private signPayload() {}

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
}
