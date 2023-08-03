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
import {
  EMPLOYEE_FORM_STATUS_NEW,
  FORM_STATUS_CLOSED,
  FORM_STATUS_NEW,
} from '../../commons/globals/Constants';
import { format, addDays } from 'date-fns';

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
  async findsWithDateDaysAfterCurrentDate() {
    const currentDate = new Date();
    const oneDayAfterCurrentDate = addDays(currentDate, 2);
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedOneDayAfterCurrentDate = format(
      oneDayAfterCurrentDate,
      'yyyy-MM-dd HH:mm:ss',
    );

    return this.formRepository
      .createQueryBuilder('form')
      .where(
        'form.expiry_date BETWEEN :currentDate AND :oneDayAfterCurrentDate',
        {
          currentDate: formattedDate,
          oneDayAfterCurrentDate: formattedOneDayAfterCurrentDate,
        },
      )
      .getMany();
  }
  async closeFormExpired() {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    return this.formRepository
      .createQueryBuilder('form')
      .where('form.expiry_date < :currentDate', { currentDate: formattedDate })
      .andWhere('form.status = :status', { status: FORM_STATUS_NEW })
      .update({ status: FORM_STATUS_CLOSED })
      .execute();
  }

  // Cron at 00:00:00 every day scan nearly expire date (1 day from now) to notify
  // @Cron('0 0 0 * * *')
  @Cron('0 * * * * *')   // for testing
  async reportService() {
    this.findsWithDateDaysAfterCurrentDate().then((res) => {
      this.logger.log('findsWithDateDaysAfterCurrentDate return: ', res);
    });
  }
  @Cron('*/30 * * * * *')
  async closeFormExpiredService() {
    this.closeFormExpired().then((res) => {
      this.logger.log('closeFormExpiredService returns: ', res);
    });
  }
}
