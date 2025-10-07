import { IsOptional, IsString, IsArray } from 'class-validator';

export class SectionSearchDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  notebookId?: string;

  @IsOptional()
  @IsString()
  createdAt_after?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'createdAt';

  @IsOptional()
  @IsString()
  sortDirection?: 'ASC' | 'DESC';
}
