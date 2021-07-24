export type transaction = 'add' | 'minus';

export interface itemStructure {
  id: string;
  value: number;
  transaction: transaction;
  description: string;
}
