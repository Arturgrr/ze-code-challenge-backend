import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Address } from './address'
import { CoverageArea } from './coverage-area'

export interface PartnerProps {
  tradingName: string
  ownerName: string
  document: string
  address: Address
  coverageArea: CoverageArea
}

export class Partner extends Entity<PartnerProps> {
  static create(props: PartnerProps, id?: UniqueEntityId) {
    const partner = new Partner(props, id)

    return partner
  }
}
