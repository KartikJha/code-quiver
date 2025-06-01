import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument } from '../models/list.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
  ) {}

  /**
   * Add an item to the user's list.
   * @param userId The ID of the user.
   * @param item The item to add to the list.
   */
  async addToList(
    userId: string,
    item: { title: string; description: string; tags?: string[] },
  ) {
    const list = await this.listModel.findOne({ userId });
    if (list) {
      list.items.push({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      list.updatedAt = new Date();
      await list.save();
    } else {
      await this.listModel.create({
        userId,
        items: [{ ...item, createdAt: new Date(), updatedAt: new Date() }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return { message: 'Item added successfully' };
  }

  /**
   * Remove an item from the user's list.
   * @param userId The ID of the user.
   * @param itemTitle The title of the item to remove.
   */
  async removeFromList(userId: string, itemTitle: string) {
    const list = await this.listModel.findOne({ userId });
    if (!list) {
      throw new Error('List not found');
    }

    const itemIndex = list.items.findIndex((item) => item.title === itemTitle);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }

    list.items.splice(itemIndex, 1);
    list.updatedAt = new Date();
    await list.save();

    return { message: 'Item removed successfully' };
  }

  /**
   * List all items for the current user.
   * @param userId The ID of the user.
   */
  async listMyItems(userId: string) {
    const list = await this.listModel.findOne({ userId });
    if (!list) {
      return { items: [] };
    }

    return { items: list.items };
  }

  /**
   * List all users and their list metadata (number of items, last updated).
   */
  async listUser() {
    const users = await this.listModel.find({}, 'userId items updatedAt');
    return users.map((user) => ({
      userId: user.userId,
      itemCount: user.items.length,
      lastUpdated: user.updatedAt,
    }));
  }
}
