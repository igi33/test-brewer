import { Answer } from './answer';

export class Question {
    id: number;
    question_title: string;
    question_content: string;
    question_type: number;
    answers: Answer[];
}
