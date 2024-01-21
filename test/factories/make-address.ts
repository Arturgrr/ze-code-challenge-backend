import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Address, AddressProps } from '@/domain/entities/address'
import { faker } from '@faker-js/faker'

export function makeAddress(
  override: Partial<AddressProps> = {},
  id?: UniqueEntityId,
) {
  const address = Address.create(
    {
      type: 'Point',
      coordinates: [faker.number.float(), faker.number.float()],
      ...override,
    },
    id,
  )

  return address
}
