import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/Form';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private userRepository: Repository<Form>,
  ) {}
}
