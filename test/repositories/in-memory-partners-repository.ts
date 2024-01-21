import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/entities/address'
import { Partner } from '@/domain/entities/partner'
import { PartnerRepository } from '@/domain/repositories/partners-repository'
import { findNearestPartner } from 'test/utils/find-nearest-partner'

export class InMemoryPartnersRepository implements PartnerRepository {
  public items: Partner[] = []

  async create(partner: Partner): Promise<void> {
    this.items.push(partner)
  }

  async findByDocument(document: string): Promise<Partner | null> {
    const partner = this.items.find((item) => item.document === document)

    if (!partner) {
      return null
    }

    return partner
  }

  async findById(id: string): Promise<Partner | null> {
    const partner = this.items.find((item) =>
      item.id.equals(new UniqueEntityId(id)),
    )

    if (!partner) {
      return null
    }

    return partner
  }

  async findNearestPartner(userLocation: Address): Promise<Partner | null> {
    return findNearestPartner(userLocation, this.items)
  }
}
