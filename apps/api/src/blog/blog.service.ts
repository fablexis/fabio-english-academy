import { Injectable, NotFoundException } from '@nestjs/common';
import type { BlogBody, BlogListItemDto, BlogPostDto, BlogVariant } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateBlogPostDto, UpdateBlogPostDto } from './dto';

// Prisma row → API DTO. `body` is stored JSON-stringified on SQLite.
type BlogRow = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: string;
  image: string;
  body: string;
  published: boolean;
  sortOrder: number;
};

function hydrate(row: BlogRow): BlogPostDto {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    readTime: row.readTime,
    level: row.level,
    variant: row.variant as BlogVariant,
    image: row.image,
    body: JSON.parse(row.body) as BlogBody,
    published: row.published,
    sortOrder: row.sortOrder,
  };
}

function toCard(post: BlogPostDto): BlogListItemDto {
  const { body: _body, ...card } = post;
  return card;
}

function serialize(input: Partial<CreateBlogPostDto>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...input };
  if (input.body !== undefined) out.body = JSON.stringify(input.body);
  return out;
}

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Public ────────────────────────────────────────────────────────────────
  async listPublished(): Promise<BlogListItemDto[]> {
    const rows = await this.prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return rows.map((r) => toCard(hydrate(r as BlogRow)));
  }

  async getBySlug(slug: string): Promise<BlogPostDto> {
    const row = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!row || !row.published) throw new NotFoundException('Blog post not found');
    return hydrate(row as BlogRow);
  }

  // ── Admin ─────────────────────────────────────────────────────────────────
  async listAll(): Promise<BlogListItemDto[]> {
    const rows = await this.prisma.blogPost.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return rows.map((r) => toCard(hydrate(r as BlogRow)));
  }

  async getById(id: number): Promise<BlogPostDto> {
    const row = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Blog post not found');
    return hydrate(row as BlogRow);
  }

  async create(input: CreateBlogPostDto): Promise<BlogPostDto> {
    const row = await this.prisma.blogPost.create({ data: serialize(input) as never });
    return hydrate(row as BlogRow);
  }

  async update(id: number, input: UpdateBlogPostDto): Promise<BlogPostDto> {
    try {
      const row = await this.prisma.blogPost.update({
        where: { id },
        data: serialize(input) as never,
      });
      return hydrate(row as BlogRow);
    } catch {
      throw new NotFoundException('Blog post not found');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.blogPost.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Blog post not found');
    }
  }
}
