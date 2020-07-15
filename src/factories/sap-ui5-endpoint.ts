import { Service } from '../helpers/protocols';
import { SapUi5EndpointService } from '../services/sap-ui5-endpoint';

export class SapUi5EndpointFactory {
    static assemble(): Service {
        return new SapUi5EndpointService();
    }
}
