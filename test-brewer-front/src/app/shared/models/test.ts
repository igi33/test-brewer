import { User } from './user';
import { Category } from './category';
import { Question } from './question';

export class Test {
    id: number;
    test_title: string;
    test_description: string;
    start_time: any;
    end_time: any;
    user: User;
    category: Category;
    questions: Question[];
}
