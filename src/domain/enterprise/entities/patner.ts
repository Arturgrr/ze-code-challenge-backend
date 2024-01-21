import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Address } from "./address";

export interface PartnerProps {
    tradingName: string;
    ownerName: string;
    document: string;
    address: Address
    coverageArea: string; //TODO: Create CoverageArea Entity
}

export class Partner extends Entity<PartnerProps> {
    static create(props: PartnerProps, id?: UniqueEntityId) {
        const partner = new Partner(props, id);

        return partner;
    }
}