import { install } from './install'
export default class IviewForm {
    static install: () => void;
    static version: string;
    constructor(){

    }
}
IviewForm.install = install
IviewForm.version = '__VERSION__'