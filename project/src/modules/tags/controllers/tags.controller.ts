import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PagParamsDto } from 'src/infrastructure/pagination/dto/pagParams.dto';
import { TagsService } from '../services/tags.service';
import { TagCreateDto } from '../dto/tagCreate.dto';
import { UserRole } from 'src/modules/users/enums/userRole.enum';
import { AuthUser } from 'src/modules/authGlobal/decorators/authUser.decorator';
import { Roles } from 'src/modules/authGlobal/decorators/roles.decorator';
import JwtAccessGuard from 'src/modules/authGlobal/guards/jwtAccess.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  listing(@Query() pagParams: PagParamsDto) {
    return this.tagsService.listing(pagParams);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessGuard)
  @Post()
  create(@Body() body: TagCreateDto, @AuthUser('id') id: string) {
    body.creatorId = id;
    return this.tagsService.create(body);
  }
}
