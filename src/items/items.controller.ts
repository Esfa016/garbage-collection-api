import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AdminAuthGuard } from 'src/auth/Guards/authGuards';
import { CreateItemDTO, UpdateItemDTO } from './Validations/itemsDTO';
import { response, Response } from 'express';
import { SuccessMessages } from 'src/Global/messages';
import { QueryParamsDTO } from 'src/Global/Validations/pagination';
import { MongooseIdDTO } from 'src/Global/Validations/mongoose';

@Controller({ version: '1', path: 'items' })
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @UseGuards(AdminAuthGuard)
  @Post('')
  async createItem(@Res() response: Response, @Body() body: CreateItemDTO) {
    const result = await this.itemsService.createItem(body);
    return response.status(HttpStatus.CREATED).json({
      success: true,
      message: SuccessMessages.SaveSuccessful,
      item: result,
    });
  }
  @Get()
  async getAllItems(@Res() response: Response, @Query() query: QueryParamsDTO) {
    const result = await this.itemsService.getAllItems(query);
    return response.status(HttpStatus.OK).json({
      success: true,
      totalData: result.totalData,
      items: result.items,
    });
  }
  @UseGuards(AdminAuthGuard)
  @Put('/:id')
  async updateItem(
    @Res() response: Response,
    @Body() body: UpdateItemDTO,
    @Param() id: MongooseIdDTO,
  ) {
    const result = await this.itemsService.updateItem(body, id.id);
    return response
      .status(HttpStatus.OK)
      .json({
        success: true,
        message: SuccessMessages.UpdateSuccessful,
        item: result,
      });
  }
  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  async deleteItem(@Res() response: Response, @Param() id: MongooseIdDTO) {
    const result = await this.itemsService.deleteItem(id.id);
    return response
      .status(HttpStatus.OK)
      .json({
        success: true,
        message: SuccessMessages.DeleteSuccessful,
        item: result,
      });
  }
  @Get('get-volumes')
  async getVolume(@Res() response: Response, @Query() query: QueryParamsDTO) {
    const result = await this.itemsService.getVolume(query)
    return response.status(HttpStatus.OK).json({success:true,items:result.items,totalData:result.totalData})
  }
  @Get('get-singles')
  async getSingles(@Res() response: Response, @Query() query: QueryParamsDTO) {
    const result = await this.itemsService.getSingles(query)
    return response.status(HttpStatus.OK).json({success:true,items:result.items,totalData:result.totalData})
  }
  @Get('/:id')
  async getOne(@Res() response: Response, @Param() id: MongooseIdDTO) {
    const result = await this.itemsService.findOne(id.id)
    return response.status(HttpStatus.OK).json({success:true,item:result})
  }
}
