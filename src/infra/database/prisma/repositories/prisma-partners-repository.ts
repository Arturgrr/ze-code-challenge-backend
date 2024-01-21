import { Partner } from '@/domain/entities/partner'
import { PartnerRepository } from '@/domain/repositories/partners-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaPartnerMapper } from '../mappers/prisma-partner-mapper'

@Injectable()
export class PrismaPartnersRepository implements PartnerRepository {
  constructor(private prisma: PrismaService) {}

  async create(partner: Partner): Promise<void> {
    const data = PrismaPartnerMapper.toPrisma(partner)

    await this.prisma.user.create({
      data: {
        ...data,
        coverageArea: {
          create: data.coverageArea as CoverageAreaCreateInput,
        },
        address: {
          create: data.address as CoverageAreaCreateInput,
        },
      },
    })
  }

  async findByDocument(document: string): Promise<Partner | null> {}

  async findById(id: string): Promise<Partner | null> {}

  async findNearestPartner(userLocation: Address): Promise<Partner | null> {}
}
