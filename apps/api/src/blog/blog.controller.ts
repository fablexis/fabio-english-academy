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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto';

@Controller()
export class BlogController {
  constructor(private readonly blog: BlogService) {}

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
  create(@Body() dto: CreateBlogPostDto) {
    return this.blog.create(dto);
  }

  @Patch('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBlogPostDto) {
    return this.blog.update(id, dto);
  }

  @Delete('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blog.remove(id);
  }
}
