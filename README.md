![Test Brewer Logo](http://oi64.tinypic.com/1zcfpg5.jpg)

# Test Brewer
*Web Programming, PMF CS*
### Contributors
- Miodrag Mikic
- Igor Stosic

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

## Frameworks and Requirements
#### Back End: Lumen - PHP API Framework by Laravel
Lumen version used: 5.6.3

Requirements:

* PHP version >= 7.1.3
* Enabled PHP extensions:
	* OpenSSL
	* PDO
	* Mbstring

#### Front End: Angular - TypeScript Front End Framework by Google
Angular CLI version used: 6.0.8

Requirements:

* Node.js version >= 8.9
* npm version >= 5.5.1

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
php -S 127.0.0.1:8000 -t public
```
#### Front End
To build the application and start a web server locally run the following command from the **Angular root directory**:
```console
ng serve
```

## Useful Links
* [Lumen](https://lumen.laravel.com/) - Back End PHP Micro-Framework
* [Angular](https://angular.io/) - Front End Framework
	* [Angular CLI](https://cli.angular.io/) - Tool to initialize, develop, scaffold and maintain Angular applications
	* [Angular Material Design](https://material.angular.io/) - Angular Material Design components
	* [Node.js](https://nodejs.org) - JavaScript runtime environment
	* [npm](https://www.npmjs.com/) - Package manager for Javascript. Ships together with Node
* [JSON Web Tokens](https://jwt.io/) - Authorization tokens for a RESTful API
