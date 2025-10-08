import { IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';

export class SectionSearchDTO extends BaseSearchDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  notebookId?: string;

  @IsOptional()
  @IsString()
  sortDirection?: 'ASC' | 'DESC';
}
