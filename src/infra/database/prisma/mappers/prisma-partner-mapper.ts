import { Partner } from '@/domain/entities/partner'
import { User as PrismaUser } from '@prisma/client'
import { makeAddress } from 'test/factories/make-address'
import { makeCoverageArea } from 'test/factories/make-coverage-area'

export class PrismaPartnerMapper {
  static toDomain(raw: PrismaUser) {
    const partnerProps = {
      tradingName: raw.tradingName,
      ownerName: raw.ownerName,
      document: raw.document,
      coverageArea: makeCoverageArea(),
      address: makeAddress(),
    }

    return Partner.create(partnerProps)
  }
}
