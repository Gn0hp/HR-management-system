import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user-module/user-service';
import { MailService } from '../mail/mail.service';
import { FormDto } from '../../entities/dtos/FormDto';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './Form';
import { QueryParams } from '../../commons/query_params';
import { In, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { EMPLOYEE_FORM_STATUS_NEW } from '../../commons/globals/Constants';

@Injectable()
export class FormService implements IBaseService {
  private readonly logger = new Logger(`${FormService.name} Worker`);
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

  async delete(id: number) {
    return this.formRepository.delete(id);
  }

  findAll(options?: any) {
    return this.formRepository.find(options);
  }

  findById(id: number) {
    return this.formRepository.findOne({ where: { id } });
  }

  async findByIds(condition: any, options?: QueryParams) {
    return await this.formRepository.find({
      where: { id: In(condition) },
      ...options,
    });
  }

  async findByOptions(condition: any, options?: QueryParams) {
    return await this.formRepository.find({
      where: condition,
      ...options,
    });
  }

  async findOneByOptions(condition: any) {
    return await this.formRepository.findOne(condition);
  }

  update(id: number, dto: FormDto) {
    if (!dto.isValid()) {
      throw new Error('Form is invalid');
    }
    return this.formRepository.update(id, dto.toEntity());
  }
  async validStatusForAction(form: number | Form) {
    if (typeof form === 'number') {
      return this.findById(form).then((res) => {
        if (!res) throw new Error('form not found');
        return res.status === EMPLOYEE_FORM_STATUS_NEW;
      });
    }
    return form.status === EMPLOYEE_FORM_STATUS_NEW;
  }
  // @Cron('*/30 * * * * *')
  // reportService() {
  //   // TODO: quét mỗi 30s dựa vào ngày hết hạn của form có ngày hết hạn gần nhất trong db để report list user chưa hoàn thành form
  //   this.logger.log('Every 30 seconds');
  // }
  // @Cron('* * * * *')
  // updateFormStatus() {}
}
