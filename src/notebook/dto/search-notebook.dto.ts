import { IsString } from 'class-validator';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';

export class SearchNotebookDTO extends BaseSearchDTO {
  @IsString()
  id?: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  userId?: string;
}
