import { IsObject } from 'class-validator';

export class SavePageContentDto {
  // The page document is an opaque JSON object here; its shape is defined by
  // the @eyb/shared PageContentMap types and merged over defaults on read.
  @IsObject()
  data!: Record<string, unknown>;
}
