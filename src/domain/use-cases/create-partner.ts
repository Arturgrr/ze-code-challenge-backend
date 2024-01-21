import { Either, left, right } from '@/core/either'
import { Address } from '../entities/address'
import { CoverageArea } from '../entities/coverage-area'
import { Partner } from '../entities/partner'
import { PartnerRepository } from '../repositories/partners-repository'

interface CreatePartnerUseCaseRequest {
  tradingName: string
  ownerName: string
  document: string
  address: Address
  coverageArea: CoverageArea
}

type CreatePartnerUseCaseResponse = Either<
  null,
  {
    partner: Partner
  }
>

export class CretePartnerUseCase {
  constructor(private partnersRepository: PartnerRepository) {}

  async execute({
    tradingName,
    ownerName,
    document,
    address,
    coverageArea,
  }: CreatePartnerUseCaseRequest): Promise<CreatePartnerUseCaseResponse> {
    const partner = Partner.create({
      tradingName,
      ownerName,
      document,
      address,
      coverageArea,
    })

    const partnerWithSameEmail = await this.partnersRepository.findByDocument(partner.document)
    if(partnerWithSameEmail) {
      return left(null) //TODO: Create a better error module
    }

    await this.partnersRepository.create(partner)

    return right({ partner })
  }
}
