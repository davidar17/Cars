import { Make } from './make';
import { Feature } from 'src/_models/feature';
import { Model } from './model';
import { Contact } from './contact';

export class Vehicle {
    id: number;
    makeId: number;
    modelId: number;
    isRegistered?: boolean;
    features: any[] = [];
    contact: Contact;
}
