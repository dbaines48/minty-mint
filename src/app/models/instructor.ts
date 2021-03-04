export class Instructor {
    id: number;
    name: string;
    experience: number;
    description: string;
    subjects: string[];

    constructor() {
        this.subjects = [];
    }
}
