import { User } from './user';
import { Category } from './category';
import { Question } from './question';

export class Test {
    id: number;
    title: string;
    description: string;
    startTime: any;
    endTime: any;
    user: User;
    category: Category;
    questions: Question[];
}
