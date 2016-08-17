// import * as courses from './../../../../data/c4bs_courses.json!text';
// import * as seminars from './../../../../data/c4bs_seminars.json!text';

import {bindable} from 'aurelia-framework';

class Course {
    image: string;
    name: string;

    constructor(image, name) {
        this.image = image;
        this.name = name;
    }
}

export class Welcome {
    course1: Course;
    course2: Course;
    course3: Course;

    constructor() {
        this.course1 = new Course('https://c4bs.org/course-images/Genesis.jpg', "Genesis");
        this.course2 = new Course('https://c4bs.org/course-images/Ecclesiology.jpg', "Ecclesiology");
        this.course3 = new Course('https://c4bs.org/course-images/Moses-to-Messiah.jpg', "Moses-to-Messiah");
    }
}