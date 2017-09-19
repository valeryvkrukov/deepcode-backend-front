import { Transaction } from './transaction';

export interface Card {
	id: number;
	card: string;
	cardType: string;
	balance: number;
	transactions?: Transaction[];
}