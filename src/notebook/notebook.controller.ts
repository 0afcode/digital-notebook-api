import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreateNotebookDTO } from './dto/create-notebook.dto';
import { UpdateNotebookDTO } from './dto/update-notebook.dto';
import { SearchNotebookDTO } from './dto/search-notebook.dto';
import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { NotebookProvider } from './notebook.service';

interface AuthRequest extends Request {
  user?: User;
}

@Controller('notebook')
export class NotebookController {
  constructor(private notebookProvider: NotebookProvider) {}

  @Post()
  async create(@Body() createDto: CreateNotebookDTO, @Req() req: AuthRequest) {
    if (!req.user) throw new BadRequestException('Invalid request');
    return this.notebookProvider.create(createDto, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateNotebookDTO,
    @Req() req: AuthRequest,
  ) {
    if (!req.user) throw new BadRequestException('Invalid request');
    return this.notebookProvider.update(id, updateDto, req.user);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notebookProvider.findById(id);
  }

  @Get()
  async search(@Query() searchParams: SearchNotebookDTO) {
    return this.notebookProvider.find(searchParams);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: AuthRequest) {
    if (!req.user) throw new BadRequestException('Invalid request');
    return this.notebookProvider.delete(id, req.user);
  }
}
