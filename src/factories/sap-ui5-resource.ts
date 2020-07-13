import { SapUi5ResourcesService } from '../services/sap-ui5-resources';

export class SapUi5ResourceFactory {
    static assemble(): SapUi5ResourcesService {
        return new SapUi5ResourcesService();
    }
}
