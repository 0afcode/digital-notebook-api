import { IsDateString, IsString } from 'class-validator';

export abstract class BaseSearchDTO {
  @IsDateString()
  createdDate?: string;

  @IsDateString()
  modifiedDate?: string;

  @IsDateString()
  deletedDate?: string;

  @IsString()
  createdBy?: string;

  @IsString()
  modifiedBy?: string;

  @IsString()
  deletedBy?: string;
}
