import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collections, PaymentType } from './Models/collectionSchema';
import mongoose, { Model } from 'mongoose';
import { BookCollectionDTO } from './Validations/collectionsDTO';
import { QueryParamsDTO } from 'src/Global/Validations/pagination';
import { PaginationHelper } from 'src/Global/helpers';
import { ErrorMessages } from 'src/Global/messages';
import Stripe from 'stripe';

@Injectable()
export class CollectionsService {
  private stripe
  constructor(
    @InjectModel(Collections.name)
    private readonly repository: Model<Collections>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion:'2024-06-20'
    });
  }

  findById(id: mongoose.Schema.Types.ObjectId) {
    return this.repository.findById(id).populate('items');
  }

  async bookCollection(body: BookCollectionDTO)
  {
    let items: mongoose.Schema.Types.ObjectId[] = []
    body.items.forEach((el) => { items.push(el) })
    delete (body.items)
    const paymentData = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: body.firstName,
            },
            unit_amount: body.totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://google.com`,
      cancel_url: 'https://google.com',
      metadata: {
        items:items.join(','),
       ...body
      },
    });
   
    return paymentData
   
  }
  createBooking(body: BookCollectionDTO, paymentType:PaymentType) {
    return this.repository.create({...body,paymentType:paymentType})
  }

  async webhook(body: any, signature: any) {
    const event = this.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_KEY)
    const metadata = event.data.object.metadata
    if (event.type === 'checkout.session.completed') {
        metadata.items = metadata.items.split(',')
      await this.createBooking(metadata,PaymentType.ONLINE)
    }
    return metadata;
  }

  async getBookings(pagination: QueryParamsDTO) {
    const totalData: number = await this.repository.countDocuments();
    const bookings: Collections[] = await this.repository
      .find().sort({createdAt:-1})
      .skip(PaginationHelper.paginateQuery(pagination))
      .limit(pagination.limit)
      .populate('items')
      ;
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
