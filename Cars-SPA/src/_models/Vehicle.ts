import { Contact } from './contact';

export class Vehicle {
    id: number;
    makeId: number;
    modelId: number;
    isRegistered?: boolean;
    features: any[] = [];
    contact: Contact;
}

export class QueryResult {
    totalItems: number;
    items: Vehicle[];
}
