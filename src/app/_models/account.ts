export interface Account {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	enabled?: boolean;
	password?: string;
	passwordConfirm?: string;
}