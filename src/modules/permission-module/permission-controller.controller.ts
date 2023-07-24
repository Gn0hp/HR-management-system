import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PermissionService } from './permission-service';
import { ApiTags } from '@nestjs/swagger';
import { parseQuery, queryParamBuilder } from '../../commons/query_params';
import { Permission } from '../../entities/Permission';
import { PermissionDto } from '../../entities/dtos/PermissionDto';

@Controller('permission-controller')
@ApiTags('permission-controller')
export class PermissionControllerController {
  constructor(private readonly service: PermissionService) {}
  @Get('get')
  findAll(@Query() query: Record<string, any>) {
    return this.service.findAll(queryParamBuilder(query));
  }
  @Get('get-by-id/:id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }
  @Get('get-by-ids')
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }
  @Get('get-by-options')
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findByOptions(asBody, queryParamBuilder(query));
  }
  @Get('get-one-by-options')
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findOneByOptions(asBody);
  }
  @Post('save')
  save(@Body() body: { entity: Permission }) {
    return this.service.save(new PermissionDto(body.entity));
  }
  @Patch('update/:id')
  update(@Param('id') id, @Body() body: { entity: Permission }) {
    return this.service.update(id, new PermissionDto(body.entity));
  }
  @Post('delete/:id')
  delete(@Param('id') id) {
    return this.service.delete(id);
  }
}
