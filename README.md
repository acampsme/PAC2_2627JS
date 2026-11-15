# BlogUocProjectFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Authentication state

Authentication is managed in memory by NgRx Store. The `auth` state keeps the
`credentials`, `loading`, `loaded`, and `error` fields. Login start, success,
and failure are represented by separate actions; logout clears the state.
Components, the route guard, and the HTTP interceptor select the state they
need. The submitted password is never put in Redux state or action payloads.
The state is intentionally not persisted, so reloading the application signs
the user out.

NgRx Store DevTools instrumentation is enabled in development mode (with a
25-action history). Install/enable the Redux DevTools browser extension to
inspect the `auth` state and actions; the integration is read-only and
disabled in production.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
