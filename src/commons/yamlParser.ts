import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
export function yamlParser(filepath: string): Record<string, any> {
  return yaml.load(readFileSync(filepath, 'utf8')) as Record<string, any>;
}
