import {bindable, inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

enum states {
    showingCourses = 1,
    showingSeminars = 2
}

@inject(EventAggregator)
export class Welcome {
    @bindable courses;
    @bindable seminars;
    @bindable currentTitle;
    eventAggregator;
    menuSubscription;
    menuIsOpen = true;

    currentState: states = states.showingCourses;

    constructor(eventAggregator) {
        this.currentTitle = "Courses";
        this.eventAggregator = eventAggregator;
    }

    loadCourses() {
        const link = document.getElementById("coursesData");
        this.courses = JSON.parse((<any>link).import.querySelector("body").innerHTML);
    }

    attached() {
        this.menuSubscription = this.eventAggregator.subscribe("menu", (response) => this.toggleMenu(response));
        this.loadCourses();
    }

    detached() {
        this.menuSubscription.dispose();
        this.courses = null;
    }

    toggleMenu(response) {
        const menuDrawer = document.getElementById("menu-drawer");

        if (this.menuIsOpen) {
            menuDrawer.style.transform = "translateX(382px)";
        }
        else {
            menuDrawer.style.transform = "translateX(0)";
        }

        this.menuIsOpen = !this.menuIsOpen;
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