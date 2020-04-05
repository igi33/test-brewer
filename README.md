![Test Brewer Logo](https://raw.githubusercontent.com/igi33/test-brewer/master/Logo.png)

# Test Brewer
*Web Programming, PMF Nis: CS*
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
- Import and export of tests
- Host tests in specific time interval

## Frameworks and Requirements
#### Back End: Lumen - PHP API Framework by Laravel
Lumen version used: 5.6.3

Requirements:

* 7.1.3 <= PHP version <= 7.3 with the following extensions enabled:
	* OpenSSL
	* PDO
	* Mbstring
* Composer

#### Front End: Angular - TypeScript Front End Framework by Google
Requirements:

* Node.js version >= 8.9
* npm version >= 5.5.1

Angular CLI version used: 6.0.8
To install Angular CLI use the following command after installing Node and npm:
```console
npm install -g @angular/cli
```

## Setting Up Env Parameters
Duplicate the `.env.example` file and rename it to `.env` in the **Lumen root directory** `/test-brewer-back/`. Here we need to specify the database connection parameters `DB_*`, including the database name. We also need to set the `JWT_SECRET` value to any string, this value is used for JWT encryption.


## Installing Dependencies
#### Back End
Install PHP dependencies by running the following command from the **Lumen root directory** `/test-brewer-back/`:
```console
composer install
```
#### Front End
Install JS packages by running the following command from the **Angular root directory** `/test-brewer-front/`:
```console
npm install
```

## Running Database Migrations
Note that prior to running migrations, the autoloader has to be updated if there are any new classes in the classmap related to migrations and seeding:
```console
composer dump-autoload
```
To run your unresolved migrations, execute the `migrate` Artisan command from the **Lumen root directory** `/test-brewer-back/`:
```console
php artisan migrate
```
For a complete rerun of all the migrations, with the optional `seed` flag which runs the seeders to populate data, execute the following:
```console
php artisan migrate:fresh --seed
```

## Running the Application
#### Back End
To serve the API locally run the following command from the **Lumen root directory** `/test-brewer-back/`:
```console
php -S 127.0.0.1:8000 -t public
```
#### Front End
To build the application and start a web server locally run the following command from the **Angular root directory** `/test-brewer-front/`:
```console
ng serve
```

## Useful Links
* [Composer](https://getcomposer.org) - Dependency Manager for PHP
* [Node.js](https://nodejs.org) - JavaScript runtime environment
* [npm](https://www.npmjs.com) - Package manager for Javascript (Ships together with Node)
* [Lumen](https://lumen.laravel.com) - Back End PHP Micro-Framework
* [Angular](https://angular.io) - Front End Framework
	* [Angular CLI](https://cli.angular.io) - A command line interface to initialize, develop, scaffold and maintain Angular applications
	* [Angular Material Design](https://material.angular.io) - Angular Material Design components
* [JSON Web Tokens](https://jwt.io) - Authorization tokens for a RESTful API
