import { NotFoundException } from '@nestjs/common';
import db from './db';
import { RuleEntity } from '../models/rule/rule.entity';
import { Rule } from '../models/rule/rule.type';

const prefix = '/rules';

export class RulesDB {
  findIndexById(id: string): number {
    const index = db.getIndex(prefix, id);
    if (index === -1) throw new NotFoundException('Rule Not Found');
    return index;
  }

  create(rule: RuleEntity) {
    db.push(`${prefix}[]`, rule);
  }

  delete(id: string) {
    const index = this.findIndexById(id);
    db.delete(`${prefix}[${index}]`);
  }

  update(id: string, rule: Partial<RuleEntity>) {
    const index = this.findIndexById(id);
    db.push(`${prefix}[${index}]`, rule, false);

    return this.findOne(id);
  }

  findAll() {
    const rules = db.getObject<Rule[]>(prefix);
    return rules;
  }

  findOne(id: string): RuleEntity {
    const index = this.findIndexById(id);
    return db.getObject<RuleEntity>(`${prefix}[${index}]`);
  }
}