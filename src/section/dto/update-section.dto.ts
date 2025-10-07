import { IsOptional, IsString, IsArray, MaxLength } from 'class-validator';

export class UpdateSectionDTO {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Ensures every item in the array is a string
  tags?: string[];

  @IsOptional()
  notebookId?: string;
}
