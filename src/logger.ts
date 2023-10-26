import { ConsoleLogger } from '@nestjs/common';
import { isArray } from 'lodash';

const PREFIX_STACK_LINE = 4;
const PREFIX_STACK_INDEX = 2;

export class ILogger extends ConsoleLogger {
  error(...message: string[]) {
    super.error(this.getPrefix() + this.getMsg(message));
  }

  info(...message: string[]) {
    super.log(this.getPrefix() + this.getMsg(message));
  }

  log(...message: string[]) {
    super.log(this.getPrefix() + this.getMsg(message));
  }

  warn(...message: string[]) {
    super.warn(this.getPrefix() + this.getMsg(message));
  }

  private getMsg(message: string[]) {
    return isArray(message) ? (message as string[]).reverse().join(' ') : message;
  }
  // Helper method to extract Class Name and Method from stack trace
  private getPrefix() {
    return '- ' + new Error().stack?.split(/\r\n|\r|\n/g)[PREFIX_STACK_LINE].split(/\s+/)[PREFIX_STACK_INDEX] + ': ';
  }
}
