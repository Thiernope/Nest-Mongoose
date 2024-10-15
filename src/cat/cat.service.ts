import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create.cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { Model } from 'mongoose';
import { Owner } from 'src/owner/schamas/owner.schema';
import { getCatWithOwnerObject } from 'src/utils';

console.log(...getCatWithOwnerObject);
@Injectable()
export class CatService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Owner.name) private readonly OwnerModel: Model<Owner>
  ) {}

  async create(createCatDto: CreateCatDto):Promise<Cat> {
    const {owner, ...catData} = createCatDto;

    const foundOwner = await this.OwnerModel.findById(owner);
    if(!foundOwner) throw new HttpException("Owner doesn't exist", 404);

    const newCat = new this.catModel({...catData})
    const savedCat = await newCat.save()

    await this.OwnerModel.updateOne(
      {_id: foundOwner._id},
      {
        $push: {cats: savedCat._id}
      }
    )


    const catWithOwner = await this.catModel.aggregate([
      {
        $match: {
          _id: savedCat._id
        }
      },
      ...getCatWithOwnerObject
    ]).exec()
    return catWithOwner[0]
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.aggregate(getCatWithOwnerObject)
  }

  findOne(id: number) {
    return this.catModel.findOne({_id: id})
  }

  // update(id: number, updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
