# TEST BREWER PROJECT 
*Web Programming, PMF CS*

#### Contributors
- Miodrag Mikic
- Igor Stosic  

## IDEA

Participate in or create simple online tests.

## FEATURES

- User system with admin access
- Tests contain questions which contain answers (Multiple correct ones???)
- Different question types (Checkbox, Radio, Text)
- Categories to classify tests (Only admins can manipulate categories?)
- Automatic grading of tests
- Import and export of tests (PDF, TXT?)
- Host tests in specific time interval

## MODELS
- **User** (user_id, user_name, password, email_address, is_admin, datetime_registration, avatar_url)
- **Category** (category_id, category_name, category_description, picture_url)
- **Test** (test_id, category_id, test_title, test_description, user_id, is_public, datetime_start, datetime_end, datetime_creation)
- **Question** (question_id, user_id, question_title, question_content, qtype_id, checker_id)
- **HasQuestion** (id, test_id, question_id, question_weight, question_order)
- **QuestionType** (qtype_id, qtype_name, answers_are_ids) - Checkbox, Radio, Text
- **Answer** (answer_id, answer_content, question_id, is_correct)
- **Submission** (submission_id, datetime_submission, test_id, user_id, score)
- **SubmissionAnswer** (sanswer_id, submission_id, question_id, answer_value)
>Text : Maybe not needed as a table in the DB?
>Igor

## USEFUL LINKS

* [Lumen](https://lumen.laravel.com/) - Back End PHP Micro-Framework
* [Angular](https://angular.io/) - Front End Framework
	* [Material](https://material.angular.io/) - Angular Material Design components
* [JSON Web Tokens](https://jwt.io/) - Authorization tokens for the RESTful API
	* [JWT Tutorial](https://medium.com/tech-tajawal/2376fd38d454) - JWT authentication for Lumen
	* [JWT Sessions](https://stackoverflow.com/questions/45445980) - Sessions in token based authentication



![Brewer Logo](http://oi64.tinypic.com/1zcfpg5.jpg)