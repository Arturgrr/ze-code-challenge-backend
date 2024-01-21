import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AddressProps {
  type: string
  coordinates: [number, number] // TODO: Learn More about GeoJSON Point
}

export class Address extends Entity<AddressProps> {
  static create(props: AddressProps, id?: UniqueEntityId) {
    const address = new Address(props, id)

    return address
  }
}
