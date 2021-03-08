import { Course } from "./course";
import { Event } from "./event";

export class Subject {
    id: number;
    name: string;
    objectives: string;
    websiteURL: string;
    courseware: Course[];
    instructorId: number;
    schedule: Event[];

    constructor() {
        this.courseware = [];
    }
}
