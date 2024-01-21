import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { CoverageArea, CoverageAreaProps } from "@/domain/entities/coverage-area";
import { faker } from "@faker-js/faker";

export function makeCoverageArea(
  override: Partial<CoverageAreaProps> = {},
  id?: UniqueEntityId
) {
  const address = CoverageArea.create({
    type: 'MultiPolygon', 
    coordinates: [
      [[faker.number.float(), faker.number.float()], [faker.number.float(), faker.number.float()]],
    ],    
    ...override
  }, id
  )

  return address
}