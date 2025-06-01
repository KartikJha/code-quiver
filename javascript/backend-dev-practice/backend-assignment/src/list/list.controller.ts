import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  /**
   * Add an item to the user's list.
   * @param userId The ID of the user (passed as a query parameter).
   * @param listItem The item to add (passed in the request body).
   */
  @Post('add')
  async addToList(
    @Query('userId') userId: string,
    @Body() listItem: { title: string; description: string; tags?: string[] },
  ) {
    return await this.listService.addToList(userId, listItem);
  }

  /**
   * Remove an item from the user's list.
   * @param userId The ID of the user (passed as a query parameter).
   * @param itemTitle The title of the item to remove (passed as a query parameter).
   */
  @Delete('remove')
  async removeFromList(
    @Query('userId') userId: string,
    @Query('itemTitle') itemTitle: string,
  ) {
    return await this.listService.removeFromList(userId, itemTitle);
  }

  /**
   * Get all items for a specific user.
   * @param userId The ID of the user (passed as a query parameter).
   */
  @Get('my-items')
  async listMyItems(@Query('userId') userId: string) {
    return await this.listService.listMyItems(userId);
  }

  /**
   * Get metadata about all users and their lists.
   */
  @Get('users')
  async listUsers() {
    return await this.listService.listUser();
  }
}
