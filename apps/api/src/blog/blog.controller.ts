import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityService, type Actor } from '../activity/activity.service';
import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto';

@Controller()
export class BlogController {
  constructor(
    private readonly blog: BlogService,
    private readonly activity: ActivityService,
  ) {}

  // ── Public read endpoints ───────────────────────────────────────────────
  @Get('blog')
  list() {
    return this.blog.listPublished();
  }

  @Get('blog/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.blog.getBySlug(slug);
  }

  // ── Admin CRUD (JWT-guarded) ────────────────────────────────────────────
  @Get('admin/blog')
  @UseGuards(JwtAuthGuard)
  listAll() {
    return this.blog.listAll();
  }

  @Get('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.blog.getById(id);
  }

  @Post('admin/blog')
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateBlogPostDto, @Req() req: Request) {
    const post = await this.blog.create(dto);
    this.activity.log(req.user as Actor, {
      action: 'create',
      entity: 'blog',
      entityId: post.slug,
      summary: `Creó el artículo «${post.title}»`,
    });
    return post;
  }

  @Patch('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBlogPostDto,
    @Req() req: Request,
  ) {
    const post = await this.blog.update(id, dto);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'blog',
      entityId: post.slug,
      summary: `Actualizó el artículo «${post.title}»`,
    });
    return post;
  }

  @Delete('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const post = await this.blog.getById(id);
    await this.blog.remove(id);
    this.activity.log(req.user as Actor, {
      action: 'delete',
      entity: 'blog',
      entityId: post.slug,
      summary: `Eliminó el artículo «${post.title}»`,
    });
  }
}
