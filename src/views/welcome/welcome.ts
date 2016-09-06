import {bindable} from 'aurelia-framework';

const createMenuMessage = "create-menu";

export class Welcome {
    @bindable courses;

    constructor() {
    }

    loadCourses() {
        const link = document.getElementById("coursesData");
        this.courses = JSON.parse((<any>link).import.querySelector("body").innerHTML);
    }

    attached() {
        this.loadCourses();
    }

    detached() {
        this.courses = null;
    }

    itemSelected(event) {
        console.log("item clicked");
    }
}