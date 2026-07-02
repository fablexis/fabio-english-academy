import { Injectable, Logger } from '@nestjs/common';
import type { ActivityListDto } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';

export interface Actor {
  id: string;
  email: string;
}

export interface ActivityEntry {
  action: string; // 'create' | 'update' | 'delete' | 'invite' | 'login' | …
  entity: string; // 'page' | 'blog' | 'user' | 'upload' | 'auth'
  entityId?: string;
  summary: string;
}

const MAX_TAKE = 100;

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Fire-and-forget: an audit failure must never break the actual request. */
  log(actor: Actor, entry: ActivityEntry): void {
    void this.prisma.activityLog
      .create({
        data: {
          userId: actor.id,
          userEmail: actor.email,
          action: entry.action,
          entity: entry.entity,
          entityId: entry.entityId,
          summary: entry.summary,
        },
      })
      .catch((err) => this.logger.error(`Failed to record activity: ${err}`));
  }

  /** Newest-first page; `before` (an id) is the cursor for "load more". */
  async list(params: {
    entity?: string;
    action?: string;
    before?: number;
    take?: number;
  }): Promise<ActivityListDto> {
    const take = Math.min(Math.max(params.take ?? 30, 1), MAX_TAKE);
    const rows = await this.prisma.activityLog.findMany({
      where: {
        ...(params.entity ? { entity: params.entity } : {}),
        ...(params.action ? { action: params.action } : {}),
        ...(params.before ? { id: { lt: params.before } } : {}),
      },
      orderBy: { id: 'desc' },
      take: take + 1, // one extra row to know whether more remain
    });
    const items = rows.slice(0, take).map((r) => ({
      id: r.id,
      userEmail: r.userEmail,
      action: r.action,
      entity: r.entity,
      entityId: r.entityId,
      summary: r.summary,
      createdAt: r.createdAt.toISOString(),
    }));
    return {
      items,
      nextCursor: rows.length > take ? items[items.length - 1].id : null,
    };
  }
}
