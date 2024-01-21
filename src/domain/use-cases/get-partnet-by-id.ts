import { Either, left, right } from '@/core/either'
import { Partner } from '../entities/partner'
import { PartnerRepository } from '../repositories/partners-repository'

interface GetPartnerByIdUseCaseUseCaseRequest {
  id: string
}

type GetPartnerByIdUseCaseUseCaseResponse = Either<
  null,
  {
    partner: Partner
  }
>

export class GetPartnerByIdUseCase {
  constructor(private partnersRepository: PartnerRepository) {}

  async execute({
    id,
  }: GetPartnerByIdUseCaseUseCaseRequest): Promise<GetPartnerByIdUseCaseUseCaseResponse> {
    const partnerById = await this.partnersRepository.findById(id)
    if (!partnerById) {
      return left(null) // TODO: Create a better error module
    }
    return right({ partner: partnerById })
  }
}
