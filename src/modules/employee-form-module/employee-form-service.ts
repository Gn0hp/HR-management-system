import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeForm } from './EmployeeForm';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { In, Not, Repository } from 'typeorm';
import { EmployeeFormDto } from '../../entities/dtos/EmployeeFormDto';
import {
  EMPLOYEE_FORM_STATUS_APPROVED,
  EMPLOYEE_FORM_STATUS_CLOSED,
  EMPLOYEE_FORM_STATUS_NEW,
  EMPLOYEE_FORM_STATUS_REJECTED,
  EMPLOYEE_FORM_STATUS_SUBMITTED,
} from '../../commons/globals/Constants';
import { UserService } from '../user-module/user-service';

@Injectable()
export class EmployeeFormService implements IBaseService {
  constructor(
    @InjectRepository(EmployeeForm)
    private readonly repository: Repository<EmployeeForm>,
    private readonly userService: UserService,
  ) {}
  async save(dto: EmployeeFormDto) {
    if (!dto.isValid()) {
      throw new Error('EmployeeForm is invalid');
    }
    return await this.repository.save(dto.toEntity());
  }
  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  findAll(options?: any) {
    return this.repository.find(options);
  }

  async findByIds(ids: any, options?: QueryParams) {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
      ...options,
    });
  }

  async findByOptions(condition: any, options?: QueryParams) {
    return await this.repository.find({ where: condition, ...options });
  }

  async findOneByOptions(condition: any) {
    return await this.repository.findOne(condition);
  }

  async update(id: number, dto: EmployeeFormDto) {
    if (!dto.isValid()) {
      throw new Error('EmployeeForm is invalid');
    }
    return this.repository.update(id, dto.toEntity());
  }

  async isSubmittedUserForm(userId: number, formId: number) {
    const user = await this.userService.findById(userId);
    return await this.repository.findOne({
      where: {
        user: {
          id: user.id,
        },
        form: {
          id: formId,
        },
        status: EMPLOYEE_FORM_STATUS_SUBMITTED,
      },
    });
  }

  async getAllUserCompleteFormByFormId(formId: number) {
    return await this.repository.find({
      select: ['user'],
      where: {
        form: {
          id: formId,
        },
        status: In([
          EMPLOYEE_FORM_STATUS_SUBMITTED,
          EMPLOYEE_FORM_STATUS_APPROVED,
          EMPLOYEE_FORM_STATUS_REJECTED,
          EMPLOYEE_FORM_STATUS_CLOSED,
        ]),
      },
    });
  }
  async getAllUserNotCompleteFormByFormId(formId: number) {
    const employeeForms = await this.repository.find({
      select: ['user'],
      where: {
        form: {
          id: formId,
        },
      },
    });
    const allUser = await this.userService.findAll().then((res) => {
      return res.map((user) => {
        if (user.id) return user.id;
      });
    });
    const userComplete = employeeForms.map((employeeForm) => employeeForm.user);
    return allUser.filter((user) => user && !userComplete.includes(user));
  }
}
