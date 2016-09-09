import {bindable} from 'aurelia-framework';
const createMenuMessage = "create-menu";

enum states {
    showingCourses = 1,
    showingSeminars = 2
}

export class Welcome {
    @bindable courses;
    @bindable seminars;
    @bindable currentTitle;

    currentState: states = states.showingCourses;

    constructor() {
        this.currentTitle = "Courses";
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
        this.currentTitle = course.Name;
        this.setState(states.showingSeminars);
    }

    setState(state: states) {
        const seminarElement = document.getElementById("seminars");
        const btnBack = document.getElementById("btnBack");

        if (state === states.showingSeminars) {
            btnBack.classList.remove("hidden");

            requestAnimationFrame(() => {
                seminarElement.style.transform = "translateX(0)";
            })
        }
        else {
            this.currentTitle = "Courses";
            btnBack.classList.add("hidden");

            requestAnimationFrame(() => {
                seminarElement.style.transform = "translateX(381px)";
            })
        }
    }

    back() {
        this.setState(states.showingCourses);
    }
}