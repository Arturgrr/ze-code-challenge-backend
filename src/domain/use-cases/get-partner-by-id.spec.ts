import { InMemoryPartnersRepository } from "test/repositories/in-memory-partners-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { GetPartnerByIdUseCase } from './get-partnet-by-id';
import { makePartner } from "@/../test/factories/make-partner";

let imMemoryPartnerRepository: InMemoryPartnersRepository;

let sut: GetPartnerByIdUseCase;

describe('Get partner by Id use-case', () => {
  beforeEach(() => {
    imMemoryPartnerRepository = new InMemoryPartnersRepository();
    sut = new GetPartnerByIdUseCase(imMemoryPartnerRepository);
  })

  it('should be able to create a new partner', async () => {
    await imMemoryPartnerRepository.create(makePartner({}, new UniqueEntityId('1234')));

    const result = await sut.execute({ id: '1234' })

    expect(result.isRight()).toBe(true);
    expect(result.value?.partner.id.equals(new UniqueEntityId('1234'))).toBe(true);
  })

  it('should not be able to get a partner with invalid id', async () => {
    const result = await sut.execute({ id: '1234' })

    expect(result.isLeft()).toBe(true);
  })
})