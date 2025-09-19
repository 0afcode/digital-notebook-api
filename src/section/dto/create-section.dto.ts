import { IsArray, IsString } from 'class-validator';

export class CreateSectionDTO {
  @IsString()
  title: string;

  @IsArray()
  tags: string[];
}
