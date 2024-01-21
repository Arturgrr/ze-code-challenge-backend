import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Address } from "@/domain/entities/address";
import { CoverageArea } from "@/domain/entities/coverage-area";
import { Partner, PartnerProps } from "@/domain/entities/partner";
import { fa, faker } from "@faker-js/faker";

export function makePartner(
  override: Partial<PartnerProps> = {},
  id?: UniqueEntityId
) {
  const partner = Partner.create({
    tradingName: faker.company.name(),
    ownerName: faker.person.fullName(),
    document: faker.string.uuid(),
    address: Address.create({type: 'Point', coordinates: [faker.number.float(), faker.number.float()]}),
    coverageArea: CoverageArea.create({type: 'MultiPolygon', coordinates: [
      [[faker.number.float(), faker.number.float()], [faker.number.float(), faker.number.float()]],
      [[faker.number.float(), faker.number.float()], [faker.number.float(), faker.number.float()]]
    ]}),
    ...override
  }, id
  )

  return partner
}