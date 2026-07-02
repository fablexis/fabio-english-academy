import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import type { TimeRange } from '@eyb/shared';

class TimeRangeDto implements TimeRange {
  @IsString() start!: string;
  @IsString() end!: string;
}

class DayAvailabilityDto {
  @IsInt() @Min(0) @Max(6) day!: number;
  @IsBoolean() on!: boolean;
  @IsArray() @ValidateNested({ each: true }) @Type(() => TimeRangeDto) ranges!: TimeRangeDto[];
}

export class UpdateSettingsDto {
  @IsOptional() @IsBoolean() bookingEnabled?: boolean;
  @IsOptional() @IsString() zoomLink?: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  weeklyAvailability?: DayAvailabilityDto[];
}

export class CreateBookingDto {
  @IsString() start!: string;
}
