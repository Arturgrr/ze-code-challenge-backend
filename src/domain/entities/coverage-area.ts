import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CoverageAreaProps {
  type: string
  coordinates: number[][][]
}

export class CoverageArea extends Entity<CoverageAreaProps> {
  get coordinates() {
    return this.props.coordinates
  }

  static create(props: CoverageAreaProps, id?: UniqueEntityId) {
    const coverageArea = new CoverageArea(props, id)

    return coverageArea
  }
}
