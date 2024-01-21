import { InMemoryPartnersRepository } from 'test/repositories/in-memory-partners-repository'
import { CretePartnerUseCase } from './create-partner'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAddress } from 'test/factories/make-address'
import { makeCoverageArea } from 'test/factories/make-coverage-area'

let imMemoryPartnerRepository: InMemoryPartnersRepository

let sut: CretePartnerUseCase

describe('Create partner use-case', () => {
  beforeEach(() => {
    imMemoryPartnerRepository = new InMemoryPartnersRepository()
    sut = new CretePartnerUseCase(imMemoryPartnerRepository)
  })

  it('should be able to create a new partner', async () => {
    const result = await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001',
      address: makeAddress(),
      coverageArea: makeCoverageArea(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.partner.id).toBeInstanceOf(UniqueEntityId)
  })

  it('should not be able to create a new partner with same document', async () => {
    await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros Vieira',
      ownerName: 'Zé da Silva Vieira',
      document: '1432132123891/0001',
      address: makeAddress(),
      coverageArea: makeCoverageArea(),
    })

    const result = await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001',
      address: makeAddress(),
      coverageArea: makeCoverageArea(),
    })

    expect(result.isLeft()).toBe(true)
  })
})
