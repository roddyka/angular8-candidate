# Development
- Angular Material
- Routing
- Local Storage (Local API and Database.json)
- Faker.js (To take randon candidates)
- Angular-mentions

# Running
- npm run server (to run the database)
- ng serve (to run the aplication)

# api
- get http://localhost:3000/candidates
...

Requirements for path “/admin”:
- (x) 1) User can add, edit and remove employees;
- (x) 2) All fields (ID, username, phone, role, name) are required;
- (x) 3) ID and Phone are unique;
- (x) 4) ID cannot be changed but all the other values can;
Requirements for path “/” for posts at “/”:
- (x) 1) Users can add posts on a timeline;
- (x) 2) By typing ‘@’ inside a post an autocomplete should pop up to help user select an
employee;
- ( ) 3) When changing the username of an employee, it should reflect in already created
posts. A possible solution is saving the text of the post as <employee id=”1”
field=”username”></employee> instead of @mathilde, or #992312312; 

I create a component called <app-employee [candidate]="id"> to change the user name when the admin change it, but i trying to aply it when i call the content on my API get call.

- (x) All data is saved and retrieved by services;
- (x) Although you can use external libraries, you managed to get it to work by yourself.
------------------------------
# Angular8Candidate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
