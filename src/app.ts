export class App {
    router = null;

    configureRouter(config, router) {
        config.title = 'Center for Biblical Studies';
        config.map([
            {route: 'welcome', name: 'welcome',      moduleId: 'views/welcome/welcome',      nav: true, title: 'Welcome'},
            {route: ['', 'construction'], name: 'construction',      moduleId: 'views/construction/construction',      nav: true, title: 'Construction'},
        ]);

        this.router = router;
    }
}