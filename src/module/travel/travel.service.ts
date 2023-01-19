import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTravelInput } from './dto/create-travel.input'
import { DeleteTravelInput } from './dto/delete-travel.input'
import { ReadTravelInput } from './dto/read-travel.input'
import { UpdateTravelInput } from './dto/update-travel.input'

@Injectable()
export class TravelService {
	constructor(private prisma: PrismaService) {}

	async createTravel(input: CreateTravelInput) {}

	async updateTravel(input: UpdateTravelInput) {}

	async readTravel(input: ReadTravelInput) {}

	async deleteTravel(input: DeleteTravelInput) {}
}
