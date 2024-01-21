import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AddressProps {
  type: string
  coordinates: [number, number]
}

export class Address extends Entity<AddressProps> {

  get coordinates(){
    return this.props.coordinates
  }

  static create(props: AddressProps, id?: UniqueEntityId) {
    const address = new Address(props, id)

    return address
  }
}
