declare namespace BrowserStorage {
	export interface IBrowserStorage {
		public set(key: string, data: string): void;
		
		public get(key: string): string;

		public remove(key: string): void;

		public clear(): void;		
	}
}