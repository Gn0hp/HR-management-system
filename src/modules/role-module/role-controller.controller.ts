import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoleService } from './role-service';
import { ApiTags } from '@nestjs/swagger';
import { parseQuery, queryParamBuilder } from '../../commons/query_params';
import { Role } from '../../entities/Role';
import { RoleDto } from '../../entities/dtos/RoleDto';

@Controller('role-controller')
@ApiTags('role-controller')
export class RoleControllerController {
  constructor(private readonly roleService: RoleService) {}
  @Get('get')
  findAll(@Query() query: Record<string, any>) {
    const options = queryParamBuilder(query);
    return this.roleService.findAll(options);
  }
  @Get('get-by-id/:id')
  findById(@Param('id') id) {
    return this.roleService.findById(id);
  }
  @Get('get-by-ids')
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.roleService.findByIds(ids, queryParamBuilder(query));
  }
  @Get('get-by-options')
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.roleService.findByOptions(asBody, queryParamBuilder(query));
  }
  @Get('get-one-by-options')
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.roleService.findOneByOptions(asBody);
  }
  @Post('save')
  save(@Body() body: { entity: Role }) {
    return this.roleService.save(new RoleDto(body.entity));
  }
  @Patch('update/:id')
  update(@Param('id') id, @Body() body: { entity: Role }) {
    return this.roleService.update(id, new RoleDto(body.entity));
  }
  @Post('delete/:id')
  delete(@Param('id') id) {
    return this.roleService.delete(id);
  }
}
