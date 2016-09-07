import {bindable} from 'aurelia-framework';

const createMenuMessage = "create-menu";

enum states {
    showingCourses = 1,
    showingSeminars = 2
}

export class Welcome {
    @bindable courses;
    @bindable seminars;

    currentState: states = states.showingCourses;

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

    courseSelected(event) {
        const id = event.target.getAttribute('data-id');
        this.setSeminars(id);
    }

    seminarSelected(event) {
        const id = event.target.getAttribute('data-id');
        console.log(id);
    }

    setSeminars(id) {
        const course = this.courses.find(function(course) {
            if (course.Id == id) {
                return course;
            }
        });
        
        this.seminars = course.Seminars;

        this.setState(states.showingSeminars);
    }

    setState(state: states) {
        if (state === states.showingSeminars) {
            document.getElementById("seminars").style.transform = "translateX(0)";
        }
        else {
            document.getElementById("seminars").style.transform = "translateX(381)";
        }
    }
}