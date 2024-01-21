import { Either, left, right } from '@/core/either'
import { Partner } from '../entities/partner'
import { PartnerRepository } from '../repositories/partners-repository'
import { Address } from '../entities/address'

type GetNearestPartnerUseCaseUseCaseResponse = Either<
  null,
  {
    partner: Partner
  }
>

export class GetNearestPartnerUseCase {
  constructor(private partnersRepository: PartnerRepository) {}

  async execute(
    userLocation: Address,
  ): Promise<GetNearestPartnerUseCaseUseCaseResponse> {
    const nearestPartner =
      await this.partnersRepository.findNearestPartner(userLocation)
    if (!nearestPartner) {
      return left(null) // TODO: Create a better error module
    }
    return right({ partner: nearestPartner })
  }
}
