import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user-service';
import { GetUser, JwtAuthGuard } from 'src/auth/jwt/jwt';
import {
  READ_PERMISSION,
  UPDATE_PERMISSION,
} from '../../commons/globals/Constants';
import { AuthInterceptor } from '../../commons/auth.interceptor';
import { User } from '../../entities/User';
import { ApiTags } from '@nestjs/swagger';
import { parseQuery } from '../../commons/query_params';

@Controller('user-controller')
@ApiTags('user-controller')
export class UserControllerController {
  constructor(private readonly service: UserService) {}

  @Get('get/:id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get('get')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(READ_PERMISSION))
  findAll(@GetUser() user, @Query() query) {
    return this.service.findAll();
  }
  @Get('get-roles/:id')
  @UseGuards(JwtAuthGuard)
  findRolesByUserId(@GetUser() user, @Param('id') id: number) {
    return this.service.getAllPermissionByUserId(id);
  }
  @Get('get-by-options')
  @UseGuards(JwtAuthGuard)
  findByOptions(@GetUser() user, @Query() query) {
    const filterUser = <User>parseQuery(query);
    return this.service.findByOptions(filterUser);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.service
      .delete(id)
      .then((res) => {
        return {
          result: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          result: false,
          message: err,
        };
      });
  }
  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor([UPDATE_PERMISSION]))
  update(@Param('id') id: number, @Body() body: User) {
    return this.service
      .update(id, body)
      .then((res) => {
        return {
          result: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          result: false,
          message: err,
        };
      });
  }
  @Patch('self-update')
  @UseGuards(JwtAuthGuard)
  selfUpdate(@GetUser() payload, @Body() body: User) {
    return this.service
      .update(payload.userId, body)
      .then((res) => {
        return {
          result: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          result: false,
          message: err,
        };
      });
  }
}
