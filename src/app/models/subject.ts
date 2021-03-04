import { Course } from "./course";

export class Subject {
    id: number;
    name: string;
    objectives: string;
    websiteURL: string;
    courseware: Course[];

    constructor() {
        this.courseware = [];
    }
}
