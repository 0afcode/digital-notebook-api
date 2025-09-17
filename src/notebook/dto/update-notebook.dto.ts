import { IsString } from 'class-validator';

export class UpdateNotebookDTO {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  updatedDate?: string;

  updatedBy?: string;

  deletedDate?: string;

  deletedBy?: string;
}
