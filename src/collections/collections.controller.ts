import {
  Controller,
  Post,
  Get,
  UseGuards,
  Query,
  Res,
  Body,
  HttpStatus,
  Headers,
  Req,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Response, Request } from 'express';
import { BookCollectionDTO } from './Validations/collectionsDTO';
import { SuccessMessages } from 'src/Global/messages';
import { AdminAuthGuard } from 'src/auth/Guards/authGuards';
import { QueryParamsDTO } from 'src/Global/Validations/pagination';
import { MongooseIdDTO } from 'src/Global/Validations/mongoose';
import { PaymentType } from './Models/collectionSchema';

@Controller({ path: 'collections', version: '1' })
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post('request-booking-online')
  async createBooking(
    @Res() response: Response,
    @Body() body: BookCollectionDTO,
  ) {
    const result = await this.collectionsService.bookCollection(body);

    return response.status(HttpStatus.PERMANENT_REDIRECT).json({
      success: true,
      message: SuccessMessages.RedirectionSuccessful,
      checkoutLink: result.url,
    });
  }

  @Post('request-booking-in-person')
  async createBookingInPeron(
    @Res() response: Response,
    @Body() body: BookCollectionDTO,
  ) {
    const result = await this.collectionsService.createBooking(
      body,
      PaymentType.ON_PERSON,
    );
    return response
      .status(HttpStatus.CREATED)
      .json({
        success: true,
        message: SuccessMessages.SaveSuccessful,
        booking: result,
      });
  }
  @UseGuards(AdminAuthGuard)
  @Get()
  async getAllBookings(
    @Res() response: Response,
    @Query() query: QueryParamsDTO,
  ) {
    const result = await this.collectionsService.getBookings(query);
    return response.status(HttpStatus.OK).json({ success: true, ...result });
  }
  @Get('/:id')
  async getSingleBooking(
    @Res() response: Response,
    @Param() id: MongooseIdDTO,
  ) {
    const result = await this.collectionsService.findById(id.id);
    return response
      .status(HttpStatus.OK)
      .json({ success: true, booking: result });
  }
  @Post('/webhook')
  async webhook(
    @Res() response: Response,
    @Req()request,
    @Body() body,
    @Headers('stripe-signature') sig: string,
  ) {
     if (!sig) throw new UnauthorizedException('Access denied');
    const result = await this.collectionsService.webhook(
      request.rawBody,
      sig,
    );
    return response
      .status(HttpStatus.CREATED)
      .json({
        success: true,
        message: SuccessMessages.SaveSuccessful,
        booking: result,
      });
  }
}
