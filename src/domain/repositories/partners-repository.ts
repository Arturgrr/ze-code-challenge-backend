import { Address } from '../entities/address'
import { Partner } from '../entities/partner'

export abstract class PartnerRepository {
  abstract create(partner: Partner): Promise<void>
  abstract findByDocument(document: string): Promise<Partner | null>
  abstract findById(id: string): Promise<Partner | null>
  abstract findNearestPartner(userLocation: Address): Promise<Partner | null>
}
