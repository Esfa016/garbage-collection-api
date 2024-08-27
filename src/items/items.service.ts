import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemLabel, Items, ItemType } from './Model/itemSchema';
import mongoose, { Model } from 'mongoose';
import { CreateItemDTO, UpdateItemDTO } from './Validations/itemsDTO';
import { QueryParamsDTO } from 'src/Global/Validations/pagination';
import { PaginationHelper } from 'src/Global/helpers';
import { ErrorMessages } from 'src/Global/messages';
@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name) private readonly repository: Model<Items>,
  ) {}

  async createItem(body: CreateItemDTO) {
    const item: Items = await this.repository.create(body);
    return item;
  }
  async getAllItems(pagiante: QueryParamsDTO) {
    const totalData: number = await this.repository.countDocuments({label:ItemLabel.STANDARD});
    const items: Items[] = await this.repository
      .find({ label: ItemLabel.STANDARD })
      .skip(PaginationHelper.paginateQuery(pagiante))
      .limit(pagiante.limit)
      .sort({ createdAt: -1 });
    return {
      items: items,
      totalData: totalData,
    };
  }
  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.repository.findById(id);
  }

  async updateItem(body: UpdateItemDTO, id: mongoose.Schema.Types.ObjectId) {
    const itemFound: Items = await this.repository.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!itemFound) throw new NotFoundException(ErrorMessages.ItemNotFound);
    return itemFound;
  }

  async deleteItem(id: mongoose.Schema.Types.ObjectId) {
    const itemFound: Items = await this.repository.findByIdAndRemove(id);
    if (!itemFound) throw new NotFoundException(ErrorMessages.ItemNotFound);
    return itemFound;
  }
  async getSingles(pagination: QueryParamsDTO) {
    const countDocuments: number = await this.repository.countDocuments({
      type: ItemType.SINGLE,
    });
    const items: Items[] = await this.repository
      .find({ type: ItemType.SINGLE })
      .sort({ createdAt: -1 })
      .skip(PaginationHelper.paginateQuery(pagination))
      .limit(pagination.limit);
    return {
      totalData: countDocuments,
      items: items,
    };
  }
  async getVolume(pagination: QueryParamsDTO) {
    const countDocuments: number = await this.repository.countDocuments({
      type: ItemType.VOLUME,
    });
    const items: Items[] = await this.repository
      .find({ type: ItemType.VOLUME })
      .sort({ createdAt: -1 })
      .skip(PaginationHelper.paginateQuery(pagination))
      .limit(pagination.limit);
    return {
      totalData: countDocuments,
      items: items,
    };
  }

  async getAdditionalItems(pagination: QueryParamsDTO) {
    const countDocuments: number = await this.repository.countDocuments({ label: ItemLabel.ADDITIONAL })
    const items: Items[] = await this.repository.find({ label: ItemLabel.ADDITIONAL }).
      sort({ createdAt: -1 })
        .skip(PaginationHelper.paginateQuery(pagination))
        .limit(pagination.limit);
    return {
      totalData: countDocuments,
      items:items
    }
  }
}
