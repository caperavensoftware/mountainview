export class App {
    router = null;

    configureRouter(config, router) {
        config.title = 'Center for Biblical Studies';
        config.map([
            {route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome/welcome',      nav: true, title: 'Welcome'},
        ]);

        this.router = router;
    }
}