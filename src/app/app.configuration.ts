import { Injectable } from '@angular/core';

@Injectable()
export class AppConfiguration {
	private apiBaseUrl = 'http://localhost/app_dev.php/api';

	public getBaseUrl() {
		return this.apiBaseUrl;
	}

	public getPath(path: string) {
		return this.apiBaseUrl + path;
	}
}