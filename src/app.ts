import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {
    router = null;
    eventAggregator = null;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    configureRouter(config, router) {
        config.title = 'Center for Biblical Studies';
        config.map([
            {route: ['', 'welcome'], name: 'welcome',      moduleId: 'views/welcome/welcome',      nav: true, title: 'Welcome'}
//            {route: ['', 'construction'], name: 'construction',      moduleId: 'views/construction/construction',      nav: true, title: 'Construction'},
        ]);

        this.router = router;
    }

    menu() {
        this.eventAggregator.publish('menu', {click: true});
    }
}