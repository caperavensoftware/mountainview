import {customElement, useShadowDOM, inject} from 'aurelia-framework';
import {MenuBase} from './menu-base';

@customElement('menu')
@useShadowDOM()
@inject(Element)
export class Menu extends MenuBase {
    constructor(element) {
        super(element);
    }
}
