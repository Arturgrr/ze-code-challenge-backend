import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CoverageAreaProps {
  type: string
  area: Array<Array<Array<Array<[number, number]>>>> // TODO: Learn More about GeoJSON MultiPolygon
}

export class CoverageArea extends Entity<CoverageAreaProps> {
  static create(props: CoverageAreaProps, id?: UniqueEntityId) {
    const coverageArea = new CoverageArea(props, id)

    return coverageArea
  }
}
