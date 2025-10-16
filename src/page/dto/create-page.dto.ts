import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

class CreatePageDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  content: string;

  @IsUUID()
  sectionId: string;
}

export default CreatePageDTO;
