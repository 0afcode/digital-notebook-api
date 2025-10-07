import { IsOptional, IsString } from 'class-validator';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';

export class SearchNotebookDTO extends BaseSearchDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
