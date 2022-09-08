# calculo-prestaciones-ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Publish package

1) Git checkout main, git fetch, git pull
2) git tag -a X.Y.Z -m "vX.Y.Z"
3) git push origin --tags
4) Go to https://...
5) Tag version -vX.Y.Z, Branch main
- Release title: vX.Y.Z
- Description: (Paste the generated CHANGELOG markdown)
- Click the "Publish release" button. Verify that new release shows in Github repository page
- Checkout latest main: git checkout  main && git pull 
- Run `yarn run publish-package`
