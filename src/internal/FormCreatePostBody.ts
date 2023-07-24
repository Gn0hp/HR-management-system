export interface IFormCreatePostBody {
  subject?: string;
  text?: string;
  link?: string;
  type?: string;
  expireDate?: string;
  attachments?: IFormCreateAttachment[];
}

export interface IFormCreateAttachment {
  filename?: string;
  content?: string;
  path?: string;
  contentType?: string;
  cid?: string;
  encoding?: string;
  contentDisposition?: 'attachment' | 'inline' | undefined;
  href?: string;
}
