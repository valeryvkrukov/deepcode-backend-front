export interface TransactionsFilter {
	transactionType?: string;
	fromDate?: Date;
	toDate?: Date;
	amountLess?: number;
	amountMore?: number;
}