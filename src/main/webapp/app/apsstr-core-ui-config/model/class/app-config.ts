export class AppConfig {
    constructor(
        public readonly appName: string,
        public readonly appStorageName: string,
        public readonly copyrightYear: number,
        public readonly appUrl: string,
        public readonly companyName?: string,
        public readonly companyUrl?: string,
        public readonly projectTag?: string,
        public readonly companyTag?: string
    ) {}
}
