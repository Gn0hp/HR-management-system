import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user-module/user-service';
import { MailService } from '../mail/mail.service';
import { FormDto } from '../../entities/dtos/FormDto';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../../entities/Form';
import { QueryParams } from '../../commons/query_params';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FormService implements IBaseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private mailService: MailService,
    @InjectRepository(Form) private formRepository: Repository<Form>,
  ) {}
  async save(formDto: FormDto) {
    if (!formDto.isValid()) {
      throw new Error('Form is invalid');
    }
    return await this.formRepository.save(formDto.toEntity());
  }
  async approve(formId: number) {}

  delete(id: number) {}

  findAll(options?: any) {}

  findById(condition, options?: QueryParams) {}

  findByIds(condition: any, options?: QueryParams) {}

  findByOptions(condition: any, options?: QueryParams) {}

  findOneByOptions(condition: any, options?: QueryParams) {}

  update(id: number, entity: any) {}

  @Cron('30 * * * *')
  reportService() {
    // TODO: quét mỗi 30s dựa vào ngày hết hạn của form có ngày hết hạn gần nhất trong db để report list user chưa hoàn thành form
    console.log('Every 30 seconds');
  }
}
