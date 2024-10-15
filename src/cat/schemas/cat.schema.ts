import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Owner } from "src/owner/schamas/owner.schema";

@Schema()
export class Cat {
    @Prop({required: true})
    name: string;

    @Prop()
    age: number;
    // @Prop(raw({
    //     firstName: {type: String},
    //     lastName: {type: String}
    // }))
    // details: Record<string, any>
    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner',} },)
    owner: Owner
 }

export type CatDocument = HydratedDocument<Cat>
export const CatSchma = SchemaFactory.createForClass(Cat)
