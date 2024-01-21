import { Address } from '@/domain/entities/address'
import { Partner } from '@/domain/entities/partner'
import { PartnerRepository } from '@/domain/repositories/partners-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPartnersRepository implements PartnerRepository {
  constructor(private prisma: PrismaService) {}

  create(partner: Partner): Promise<void> {}

  findByDocument(document: string): Promise<Partner | null> {}

  findById(id: string): Promise<Partner | null> {}

  findNearestPartner(userLocation: Address): Promise<Partner | null> {}
}
