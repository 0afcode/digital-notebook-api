import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

class UpdatePageDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsOptional()
  content?: string;

  @IsUUID()
  @IsOptional()
  sectionId?: string;
}

export default UpdatePageDTO;
