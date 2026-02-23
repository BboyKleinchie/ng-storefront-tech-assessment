import { KeyValue } from '@angular/common';

export type Tab = KeyValue<string, string> & {
  isSelected?: boolean
}
