import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from 'src/entities/Form';
import { MailModule } from '../mail/mail.module';
import { UserModuleModule } from '../user-module/user-module.module';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), MailModule, UserModuleModule],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModuleModule {}
