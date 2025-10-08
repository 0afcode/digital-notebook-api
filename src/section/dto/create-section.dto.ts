import { IsString, IsUUID } from 'class-validator';

export class CreateSectionDTO {
  @IsString()
  name: string;

  @IsUUID()
  noteboodId: string;
}
