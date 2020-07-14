import { Service } from '../helpers/protocols';
import { SapUi5ResourcesService } from '../services/sap-ui5-resources';

export class SapUi5ResourceFactory {
    static assemble(): Service {
        return new SapUi5ResourcesService();
    }
}
