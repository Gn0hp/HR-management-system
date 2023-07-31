import { ApiProperty } from '@nestjs/swagger';

export class IFormCreateAttachment {
  @ApiProperty({
    description: 'Name of the attachment',
    type: String,
  })
  filename?: string;
  @ApiProperty()
  content?: string;
  @ApiProperty()
  path?: string;
  @ApiProperty()
  contentType?: string;
  @ApiProperty()
  cid?: string;
  @ApiProperty()
  encoding?: string;
  @ApiProperty({
    description: 'Disposition of the attachment',
    type: String,
    enum: ['attachment', 'inline'],
  })
  contentDisposition?: 'attachment' | 'inline' | undefined;
  @ApiProperty()
  href?: string;
}

export class IFormCreatePostBody {
  @ApiProperty({
    description: 'Subject of the form',
    type: String,
  })
  subject?: string;
  @ApiProperty({
    description: 'Content of the form',
    type: String,
  })
  text?: string;
  @ApiProperty({
    description: 'Link to the form. Form use from 3rf-party so just need url',
    type: String,
  })
  link?: string;
  @ApiProperty({
    description: 'Type of the form',
    type: String,
    enum: ['1', '2'],
    example: '1',
  })
  type?: string;
  @ApiProperty({
    description: 'Expire date of the form with format "YYYY-MM-DD"',
    type: String,
    example: '2021-12-31',
  })
  expireDate?: string;
  @ApiProperty({
    description: 'Attachments of the form',
    type: [IFormCreateAttachment],
  })
  attachments?: IFormCreateAttachment[];
}

