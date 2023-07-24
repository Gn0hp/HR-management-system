import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonQueryParam } from './commons/query_params';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    description: 'For all Get list api, use this below query params for filter',
  })
  @CommonQueryParam()
  getHello(): string {
    return this.appService.getHello();
  }
}
