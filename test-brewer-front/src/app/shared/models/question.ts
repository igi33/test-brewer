import { Answer } from './answer';

export class Question {
    id: number;
    title: string;
    content: string;
    type: number;
    answers: Answer[];
}
