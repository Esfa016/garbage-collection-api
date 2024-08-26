import {
  Controller,
  Post,
  Get,
  UseGuards,
  Query,
  Res,
  Body,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Response } from 'express';
import { BookCollectionDTO } from './Validations/collectionsDTO';
import { SuccessMessages } from 'src/Global/messages';
import { AdminAuthGuard } from 'src/auth/Guards/authGuards';
import { QueryParamsDTO } from 'src/Global/Validations/pagination';
import { MongooseIdDTO } from 'src/Global/Validations/mongoose';

@Controller({ path: 'collections' ,version:'1'})
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  async createBooking(
    @Res() response: Response,
    @Body() body: BookCollectionDTO,
  ) {
    const result = await this.collectionsService.bookCollection(body);

    return response.status(HttpStatus.CREATED).json({
      success: true,
      message: SuccessMessages.SaveSuccessful,
      booking: result,
    });
  }
 @UseGuards(AdminAuthGuard)
  @Get()
 async getAllBookings(@Res() response: Response, @Query() query: QueryParamsDTO) {
   const result = await this.collectionsService.getBookings(query)
   return response.status(HttpStatus.OK).json({success:true,...result})
  }
  @Get('/:id')
  async getSingleBooking(@Res() response: Response, @Param() id: MongooseIdDTO) {
    const result = await this.collectionsService.findById(id.id)
    return response.status(HttpStatus.OK).json({success:true,booking:result})
    
  }
}
