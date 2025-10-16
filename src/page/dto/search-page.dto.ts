import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';

class SearchPageDTO extends BaseSearchDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  tags?: string;

  @IsArray()
  @IsOptional()
  content?: string;

  @IsUUID()
  @IsOptional()
  sectionId?: string;
}

export default SearchPageDTO;
