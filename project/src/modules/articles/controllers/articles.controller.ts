import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';
import { PagParamsDto } from 'src/infrastructure/pagination/dto/pagParams.dto';
import { AuthDataType } from 'src/modules/auth/types/authData.type';
import { UserRole } from 'src/modules/users/enums/userRole.enum';
import { ArticleCreateDto } from '../dto/articleCreate.dto';
import { ArticleUpdateDto } from '../dto/articleUpdate.dto';
import { AuthUser } from 'src/modules/authGlobal/decorators/authUser.decorator';
import { Roles } from 'src/modules/authGlobal/decorators/roles.decorator';
import JwtAccessGuard from 'src/modules/authGlobal/guards/jwtAccess.guard';
import JwtOpenGuard from 'src/modules/authGlobal/guards/jwtOpen.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtOpenGuard)
  @Get()
  listing(
    @Query() params: PagParamsDto,
    @AuthUser() auth: AuthDataType,
    @Query('tags') tags: string[],
  ) {
    return this.articlesService.listing(params, tags, auth);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtOpenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() auth: AuthDataType) {
    return this.articlesService.findOneById(id, auth);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessGuard)
  @Post()
  create(@Body() body: ArticleCreateDto, @AuthUser('id') authId: string) {
    body.creatorId = authId;
    return this.articlesService.create(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessGuard)
  @Patch(':id')
  update(@Body() body: ArticleUpdateDto, @Param('id') id: string) {
    return this.articlesService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }
}
