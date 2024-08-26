import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collections } from './Models/collectionSchema';
import mongoose, { Model } from 'mongoose';
import { BookCollectionDTO } from './Validations/collectionsDTO';
import { QueryParamsDTO } from 'src/Global/Validations/pagination';
import { PaginationHelper } from 'src/Global/helpers';
import { ErrorMessages } from 'src/Global/messages';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collections.name)
    private readonly repository: Model<Collections>,
  ) {}

  findById(id: mongoose.Schema.Types.ObjectId) {
    return this.repository.findById(id)
  }

  async bookCollection(body: BookCollectionDTO) {
    const booking: Collections = await this.repository.create(body);
    return booking;
  }

  async getBookings(pagination: QueryParamsDTO) {
    const totalData: number = await this.repository.countDocuments();
    const bookings: Collections[] = await this.repository
      .find()
      .skip(PaginationHelper.paginateQuery(pagination))
      .limit(pagination.limit);
    return {
      totalData: totalData,
      bookings: bookings,
    };
  }

  async deleteBooking(id: mongoose.Schema.Types.ObjectId) {
    const bookingFound: Collections = await this.findById(id)
    if (!bookingFound) throw new NotFoundException(ErrorMessages.BookingNotFound)
    await this.repository.findByIdAndDelete(id)
    return bookingFound
  }
}
