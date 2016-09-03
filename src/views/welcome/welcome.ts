import {bindable} from 'aurelia-framework';

export class Welcome {
    courses;
    welcomeWorker

    constructor() {
        this.welcomeWorker = new Worker("./app/src/webworkers/welcome-worker.js");
        this.welcomeWorker.onmessage = this.onWelcomeWorkerMessage;
        this.loadCourses();
    }

    onWelcomeWorkerMessage(event) {
        console.log(event.data)
    }

    loadCourses() {
        const link = document.getElementById("coursesData");
        this.courses = JSON.parse((<any>link).import.querySelector("body").innerHTML);

        this.welcomeWorker.postMessage("greet");
    }

    detached() {
        if (this.welcomeWorker) {
            this.welcomeWorker.terminate();
            this.welcomeWorker = null;
        }

        this.courses = null;
    }
}