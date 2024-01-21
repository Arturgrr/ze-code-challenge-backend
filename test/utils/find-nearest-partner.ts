import { Address } from '@/domain/entities/address'
import { Partner } from '@/domain/entities/partner'
import { CoverageArea } from '@/domain/entities/coverage-area'

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371 // Raio médio da Terra em quilômetros
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distância em quilômetros
  return distance
}

function isLocationInCoverageArea(
  location: Address,
  coverageArea: CoverageArea,
): boolean {
  const [longitude, latitude] = location.coordinates

  let inside = false
  for (
    let i = 0, j = coverageArea.coordinates[0].length - 1;
    i < coverageArea.coordinates[0].length;
    j = i++
  ) {
    const xi = coverageArea.coordinates[0][i][0]
    const yi = coverageArea.coordinates[0][i][1]
    const xj = coverageArea.coordinates[0][j][0]
    const yj = coverageArea.coordinates[0][j][1]

    const intersect =
      yi > latitude !== yj > latitude &&
      longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

export function findNearestPartner(
  userLocation: Address,
  partners: Partner[],
): Partner | null {
  let nearestPartner: Partner | null = null
  let minDistance = Infinity

  for (const partner of partners) {
    const distance = haversineDistance(
      userLocation.coordinates[1],
      userLocation.coordinates[0],
      partner.address.coordinates[1],
      partner.address.coordinates[0],
    )

    if (
      distance < minDistance &&
      isLocationInCoverageArea(userLocation, partner.coverageArea)
    ) {
      minDistance = distance
      nearestPartner = partner
    }
  }

  return nearestPartner
}
