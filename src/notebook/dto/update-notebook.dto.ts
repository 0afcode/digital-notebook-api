import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateNotebookDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;
}
