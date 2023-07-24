import { ISendMailOptions } from '@nestjs-modules/mailer';
import { IMailContext } from '../commons/interfaces/IMailContext';
import { join } from 'path';

export function ParseMailContent(context: IMailContext, content: any) {
  return <ISendMailOptions>{
    transporterName: 'gmail',
    to: content?.to || '',
    from: content?.from || '',
    subject: content?.subject || '',
    text: content?.text || '',
    template: join(__dirname, '../modules/mail/templates/mail-template.hbs'),
    context: {
      text: context?.text || '',
      type: context?.type || '',
      link: context?.link || '',
    },
    attachments: content?.attachments
      ? parseAttachmentContent(content?.attachments)
      : undefined,
  };
}

function parseAttachmentContent(attachments) {
  return attachments.map((attachment) => {
    return {
      filename: attachment?.filename || undefined,
      content: attachment?.content || undefined,
      path: attachment?.path || undefined,
      contentType: attachment?.contentType || undefined,
      cid: attachment?.cid || undefined,
      encoding: attachment?.encoding || undefined,
      contentDisposition: attachment?.contentDisposition || undefined,
      href: attachment?.href || undefined,
    };
  });
}
