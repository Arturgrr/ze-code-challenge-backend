import { InMemoryPartnersRepository } from "test/repositories/in-memory-partners-repository";
import { CretePartnerUseCase } from "./create-partner";
import { Address } from "../entities/address";
import { CoverageArea } from "../entities/coverage-area";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let imMemoryPartnerRepository: InMemoryPartnersRepository;

let sut: CretePartnerUseCase;

describe('Create partner use-case', () => {
  beforeEach(() => {
    imMemoryPartnerRepository = new InMemoryPartnersRepository();
    sut = new CretePartnerUseCase(imMemoryPartnerRepository);
  })

  it('should be able to create a new partner', async () => {
    const result = await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001',
      address: Address.create({type: 'Point', coordinates: [-46.57421, -21.785741]}),
      coverageArea: CoverageArea.create({type: 'MultiPolygon', coordinates: [
        [[30, 20], [45, 40], [10, 40], [30, 20]],
        [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]
      ]})
    })

    expect(result.isRight()).toBe(true);
    expect(result.value?.partner.id).toBeInstanceOf(UniqueEntityId);
  })

  it('should not be able to create a new partner with same document', async () => {
    await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros Vieira',
      ownerName: 'Zé da Silva Vieira',
      document: '1432132123891/0001',
      address: Address.create({type: 'Point', coordinates: [-46, -21]}),
      coverageArea: CoverageArea.create({type: 'MultiPolygon', coordinates: [
        [[3, 0], [5, 4], [0, 0], [0, 0]],
        [[5, 2], [4, 0], [0, 0], [1, 0], [1, 1]]
      ]})
    })

    const result = await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001',
      address: Address.create({type: 'Point', coordinates: [-46.57421, -21.785741]}),
      coverageArea: CoverageArea.create({type: 'MultiPolygon', coordinates: [
        [[30, 20], [45, 40], [10, 40], [30, 20]],
        [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]
      ]})
    })

    expect(result.isLeft()).toBe(true);
  })
})