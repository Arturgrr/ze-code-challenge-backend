import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<Props> {
    private _id: UniqueEntityId;
    protected props: Props;

    protected constructor(props: Props, id?: UniqueEntityId) {
        this.props = props;
        this._id = id ?? new UniqueEntityId();
    }
}