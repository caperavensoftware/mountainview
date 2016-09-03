import {bindable} from 'aurelia-framework';

const createMenuMessage = "create-menu";

class WelcomeUIAdapter {
    updateCourses(html) {
        requestAnimationFrame(() => {
            document.getElementById("courses").innerHTML = html;
        });
    }
}

export class Welcome {
    courses;
    welcomeWorker;
    uiAdapter;

    constructor() {
        this.uiAdapter = new WelcomeUIAdapter();

        this.welcomeWorker = new Worker("./app/src/webworkers/welcome-worker.js");
        this.welcomeWorker.onmessage = this.onWelcomeWorkerMessage.bind(this);
    }

    onWelcomeWorkerMessage(event) {
        if (event.data.action === createMenuMessage) {
            this.uiAdapter.updateCourses(event.data.result);
        }
    }

    loadCourses() {
        const link = document.getElementById("coursesData");
        this.courses = JSON.parse((<any>link).import.querySelector("body").innerHTML);

        this.welcomeWorker.postMessage({
            action: createMenuMessage,
            data: this.courses
        });
    }

    attached() {
        this.loadCourses();
    }

    detached() {
        if (this.welcomeWorker) {
            this.welcomeWorker.terminate();
            this.welcomeWorker = null;
        }

        this.courses = null;
        this.uiAdapter = null;
    }

    itemSelected(event) {
        console.log("item clicked");
    }
}