import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Partner } from '@/domain/entities/partner'
import { PartnerRepository } from '@/domain/repositories/partners-repository'

export class InMemoryPartnersRepository implements PartnerRepository {
  public itens: Partner[] = []

  async create(partner: Partner): Promise<void> {
    this.itens.push(partner)
  }

  async findByDocument(document: string): Promise<Partner | null> {
    const partner = this.itens.find((item) => item.document === document)

    if (!partner) {
      return null
    }

    return partner
  }

  async findById(id: UniqueEntityId): Promise<Partner | null> {
    const partner = this.itens.find((item) => item.id === id)

    if (!partner) {
      return null
    }

    return partner
  }
}
