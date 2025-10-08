import { IsOptional, IsString, MaxLength, IsUUID } from 'class-validator';

export class UpdateSectionDTO {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsUUID()
  notebookId?: string;
}
