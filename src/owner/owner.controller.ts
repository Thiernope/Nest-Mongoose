import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { CreateOwnerDto } from "./dto/create.owner.dto";

@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerService: OwnerService) {}

    @Get()
    findAll() {
        return this.ownerService.findAll()
    }

    @Get(':id')
    async getOwnerById(@Param('id') id: string) {
      return await this.ownerService.findById(id)
    }

    @Post()
    create(@Body() createOwnerDto: CreateOwnerDto) {
        return this.ownerService.create(createOwnerDto)
    }
}

