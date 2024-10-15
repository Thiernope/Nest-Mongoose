import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Cat } from "src/cat/schemas/cat.schema";

@Schema()
export class Owner {
    @Prop({required: true})
    name: string;

    @Prop()
    country: string;

    @Prop({type: [{type: mongoose.Schema.ObjectId, ref: 'Cat'}]})
    cats: Cat[]

}

export type OwnerDocument = HydratedDocument<Owner>
export const OwnerSchema = SchemaFactory.createForClass(Owner)
