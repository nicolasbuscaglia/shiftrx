import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateAuctionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  startingPrice: number;

  @IsNotEmpty()
  @IsDateString()
  endTime: string; // ISO-8601 date string
}
