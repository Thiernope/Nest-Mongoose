import { Owner } from "src/owner/schamas/owner.schema";

export class CreateCatDto {
    name: string;
    age: number;
    owner: Owner;
}