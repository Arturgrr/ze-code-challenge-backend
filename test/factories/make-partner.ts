import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Partner, PartnerProps } from '@/domain/entities/partner'
import { faker } from '@faker-js/faker'
import { makeCoverageArea } from './make-coverage-area'
import { makeAddress } from './make-address'

export function makePartner(
  override: Partial<PartnerProps> = {},
  id?: UniqueEntityId,
) {
  const partner = Partner.create(
    {
      tradingName: faker.company.name(),
      ownerName: faker.person.fullName(),
      document: faker.string.uuid(),
      address: makeAddress(),
      coverageArea: makeCoverageArea(),
      ...override,
    },
    id,
  )

  return partner
}
