import { HttpException, Injectable, NotFoundException, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Owner } from "./schamas/owner.schema";
import mongoose, { Model } from "mongoose";
import { CreateOwnerDto } from "./dto/create.owner.dto";

@Injectable()
export class OwnerService {
    constructor(@InjectModel(Owner.name) private readonly ownerModel: Model<Owner>) {}

    async findAll():Promise<Owner[]> {
        return this.ownerModel.find().populate("cats").exec()
    }

    async findById(ownerId: string):Promise<Owner> {
      const isValid = mongoose.Types.ObjectId.isValid(ownerId);
      if(!isValid) throw new HttpException('Invalid Id', 400);
      const owner = await this.ownerModel.findById(ownerId).populate('cats').exec()
      if(!owner) {
        throw new NotFoundException(`Owner with this id => ${ownerId} not found`)
      }
      return owner;
    }

    async create(createOwnerDto: CreateOwnerDto) {
        const newOwner = new this.ownerModel(createOwnerDto)
        return newOwner.save()
    }

}