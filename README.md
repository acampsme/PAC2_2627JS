# Exercicis de la PAC

##
- A partir del projecte inicial s'hi ha anat fent els canvis tècnics necessaris per a complir amb els enunciats. 

### exercici 1
- Setup backend, postgres, api
- Afegeix la configuració inicial de Git mitjançant `.gitignore` i la llicència.
- Migra de `Promise<T>` a `Observable<T>` totes les operacions HTTP demanades:
  - `AuthService.login`.
  - Operacions de lectura, creació, actualització i eliminació de categories.
  - Operacions de lectura, creació, actualització, likes/dislikes i eliminació
    de publicacions.
  - Registre, actualització i lectura d’usuari a `UserService`.
- Elimina les crides a `.toPromise()` i retorna directament els observables
  generats per `HttpClient`.
- Adapta els components consumidors perquè tractin els resultats i els errors
  mitjançant subscripcions. Això manté la petició lazy fins que hi ha una
  subscripció i permet utilitzar els fluxos d’error d’RxJS/Angular.

### exercici 2

- Afegeix el pla de proves i una còpia d’execució en Excel.
- El pla enumera 42 casos d’ús, incloent-hi autenticació, registre, perfil,
  publicacions, categories, dashboard, validacions i errors.
- El full d’execució conserva resultats, intents i observacions separats de la
  definició teòrica dels casos.

### exercici 3

- Introdueix NgRx Store per convertir l’autenticació en estat global de
  l’aplicació. Afegeix les accions inicials de login correcte i logout, el
  reducer, selectors i la prova del reducer; registra Store amb
  `StoreModule.forRoot`.
- El login desa `userId` i `accessToken` a Redux en lloc d’escriure’ls a
  `localStorage`.
- Els components de categories, publicacions i perfil obtenen l’identificador
  d’usuari mitjançant selectors. Home i header deriven l’estat autenticat del
  Store.
- El `AuthGuard` consulta el token a Redux i retorna un `UrlTree` cap a login
  quan no hi ha sessió.
- L’interceptor HTTP consulta el token al Store i afegeix la capçalera
  d’autorització a les peticions autenticades.
- Elimina `LocalStorageService`, `HeaderMenusService`, el DTO del menú i les
  seves proves. També elimina les referències associades als components.
- Conseqüència de disseny: l’estat és només en memòria; en recarregar la pàgina
  la sessió no es restaura.
- Amplia `AuthState` per representar el cicle de vida del login amb
  `credentials`, `loading`, `loaded` i `error`.
- Afegeix les accions `Login Started`, `Login Success` i `Login Failure`.
  El reducer actualitza les flags i l’error en cada transició; logout torna a
  l’estat inicial.
- Actualitza els selectors per obtenir `userId` i `accessToken` des de
  `credentials`.
- Evita posar la contrasenya a l’estat o a l’historial de Redux: després del
  login correcte es desa `AuthDTO` amb el camp `password` buit.
- Incorpora `@ngrx/store-devtools` i instrumenta Store DevTools amb una
  història màxima de 25 accions. En desenvolupament es pot inspeccionar l’estat
  i les accions; a producció s’activa `logOnly`.
- Amplia les proves del reducer per cobrir inici, èxit, error i logout.
- Actualitza la documentació tècnica del comportament de sessió i DevTools.
- Consideració de seguretat: el token d’accés és part de `credentials` i, per
  tant, queda visible a DevTools en desenvolupament. No s’ha d’incloure en
  captures ni compartir-lo.

### exercici 4

- Afegeix l’Excel d’execució de regressió després de la migració a Redux i el
  document PDF de suport.
- L’Excel conserva les columnes d’Observables i afegeix
  **Resultat real amb transformació a Redux**, a més d’intents i observacions.
- Resultat registrat per als 42 casos:
  - **41 PASSAT**.
  - **1 SIMULAT**: alta correcta de registre comprovada amb una resposta HTTP
    201 interceptada, per no crear un compte persistent.
- Les operacions CRUD correctes es van verificar amb l’API real; les respostes
  d’error i alguns casos límit es van simular amb interceptacions HTTP.
- Les dades temporals de categoria i publicació es van eliminar i l’àlies del
  perfil es va restaurar i tornar a llegir.


# Enllaços

- [Pla de proves d’Observables](./Pla_de_proves_Observables.xlsx)
- [Execució del pla de proves d’Observables](./Pla_de_proves_Observables_execucio.xlsx)
- [Execució del pla de proves amb Redux](./Pla_de_proves_Observables_execucio_Redux.xlsx)
- [Document PDF d’autenticació Redux](./auth-redux.pdf)


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