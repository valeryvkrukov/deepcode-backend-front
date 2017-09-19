import { Card } from './card';

export interface User {
	id: number;
	username: string;
	email: string;
	firstName?: string;
	lastName?: string;
	enabled: boolean;
	lastLogin: Date;
	cards?: Card[]
}
