import {bindable, inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

enum states {
    showingCourses = 1,
    showingSeminars = 2,
    showingSeminar = 3
}

@inject(EventAggregator)
export class Welcome {
    course;
    @bindable courses;
    @bindable seminars;
    @bindable seminar;
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
        this.setSeminar(id);
    }

    setSeminars(id) {
        this.course = this.courses.find(function(course) {
            if (course.Id == id) {
                return course;
            }
        });

        this.seminars = this.course.Seminars;
        this.currentTitle = this.course.Name;
        this.setState(states.showingSeminars);
    }

    setSeminar(id) {
        this.seminar = this.course.Seminars.find(function(seminar) {
           if (seminar.Id == id) {
               return seminar;
           }
        });

        this.currentTitle = this.seminar.Name;
        this.setState(states.showingSeminar);
    }

    setState(state: states) {
        const seminarsElement = document.getElementById("seminars");
        const seminarElement = document.getElementById("seminar");
        const btnBack = document.getElementById("btnBack");

        if (state === states.showingSeminars) {
            btnBack.classList.remove("hidden");

            requestAnimationFrame(() => {
                if (this.seminar == null) {
                    seminarsElement.style.transform = "translateX(0)";
                }
                else {
                    seminarElement.style.transform = "translateX(381px)";
                    this.seminar = null;
                }
            })
        }
        else if (state === states.showingSeminar) {
            requestAnimationFrame(() => {
                seminarElement.style.transform = "translateX(0)"
            })
        }
        else {
            this.currentTitle = "Courses";
            btnBack.classList.add("hidden");

            requestAnimationFrame(() => {
                seminarsElement.style.transform = "translateX(381px)";
            })
        }
    }

    back() {
        if (this.seminar) {
            this.setState(states.showingSeminars);
        }
        else {
            this.setState(states.showingCourses);
        }
    }

    closeMedia() {
        document.getElementById("media").style.display = "none";
        (<any>document.getElementById("audio")).pause();
    }

    playAudio(event) {
        const audio = event.target.getAttribute("data-audio");
        document.getElementById("media").style.display = "block";
        document.getElementById("audio").setAttribute("src", audio);
    }
}