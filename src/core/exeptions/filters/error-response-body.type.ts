import { DomainExceptionCode } from '../domain-exception-code';
import { Extension } from '../domain-exeptions';

export type ErrorResponseBody = {
  timestamp: string;
  path: string | null;
  message: string;
  extensions: Extension[];
  code: DomainExceptionCode;
};
