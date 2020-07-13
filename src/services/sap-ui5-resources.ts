export class SapUi5ResourcesService {
    isUi5Resource(url: string): boolean {
        return url.includes('/resources/');
    }
}
