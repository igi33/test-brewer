![Test Brewer Logo](http://oi64.tinypic.com/1zcfpg5.jpg)

# Test Brewer
*Web Programming, PMF CS*
### Contributors
- Miodrag Mikic
- Igor Stosic

## Requirements
Work in progress...

## Running Migrations
To run your unresolved migrations, execute the `migrate` Artisan command from the **Lumen root directory**:
```console
php artisan migrate
```
For a complete rerun of all the migrations, with the optional `seed` flag which runs the seeders to populate data, execute the following:
```console
php artisan migrate:fresh --seed
```
Note that prior to running migrations, the autoloader has to be updated if there are any new classes in the classmap related to migrations and seeding:
```console
composer dump-autoload
```

## Serving the Application
#### Back End
To serve the API locally run the following command from the **Lumen root directory**:
```console
php -S localhost:8000 -t public
```
#### Front End
To build the application and start a web server locally run the following command from the **Angular root directory**:
```console
ng serve
```

## Project Idea
Participate in or create simple online tests.

## Features
- User system with admin access
- Tests contain questions which contain answers
- Different question types (Checkbox, Radio, Text)
- Categories to classify tests (Admins can manipulate categories)
- Automatic grading of tests
- Import and export of tests (PDF, XSLX, TXT)
- Host tests in specific time interval

## Useful Links
* [Lumen](https://lumen.laravel.com/) - Back End PHP Micro-Framework
* [Angular](https://angular.io/) - Front End Framework
	* [Material](https://material.angular.io/) - Angular Material Design components
* [JSON Web Tokens](https://jwt.io/) - Authorization tokens for the RESTful API
	* [JWT Tutorial](https://medium.com/tech-tajawal/2376fd38d454) - JWT authentication for Lumen
	* [JWT Sessions](https://stackoverflow.com/questions/45445980) - Sessions in token based authentication
