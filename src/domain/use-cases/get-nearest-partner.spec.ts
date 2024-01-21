import { InMemoryPartnersRepository } from 'test/repositories/in-memory-partners-repository'
import { GetNearestPartnerUseCase } from './get-nearest-partner'
import { makeAddress } from 'test/factories/make-address'
import { makePartner } from 'test/factories/make-partner'
import { makeCoverageArea } from 'test/factories/make-coverage-area'

let imMemoryPartnerRepository: InMemoryPartnersRepository

let sut: GetNearestPartnerUseCase

describe('Get nearest partner', () => {
  beforeEach(() => {
    imMemoryPartnerRepository = new InMemoryPartnersRepository()
    sut = new GetNearestPartnerUseCase(imMemoryPartnerRepository)
  })

  it('should not be able to find a near partner', async () => {
    const location = makeAddress()
    await imMemoryPartnerRepository.create(
      makePartner({
        coverageArea: makeCoverageArea({
          coordinates: [
            [
              [location.coordinates[0], location.coordinates[1]],
              [location.coordinates[0], location.coordinates[1]],
              [location.coordinates[0], location.coordinates[1]],
              [location.coordinates[0], location.coordinates[1]],
            ],
          ],
        }),
      }),
    )

    const result = await sut.execute(location)

    expect(result.isRight()).toBe(false)
  })
})
