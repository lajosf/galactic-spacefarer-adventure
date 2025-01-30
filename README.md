# Galactic Spacefarer Adventure
Welcome to the Galactic Spacefarer Adventure project!

## How to run the backend only 
- Open a new terminal and run `cds watch`, or `cds serve`

## How to run the backend and UI (make sure, you are using compatible browser)
- Open a new terminal and run `npm run watch-spacefarers`

## State of the challange
All tasks are ready, I was using my creativity and innovation with Data Model and Service Definition for the Spacefarers.

The backend is covered with unit tests. Altough draft mode handling is in progress state currently in the unit tests (tests which are not prepared for draft mode are commented out yet).

### Running unit tests:
- Open a new terminal and run `npm test`

### Running manual tests:
- Open a new terminal and run `cds serve`
- Use `test\spacefarer-service-auth.http` and  `test\spacefarer-service.http`
- Please note most manual tests work if you disable this line `annotate GalacticSpacefarers with @odata.draft.enabled;` in `spacefarer-service-auth.cds` file, as wont work in draft mode.

## Application Details
The application is prefilled with some user data for testing purposes. (Check db/data/*.csv for more details)
Also at the current development phase we are using mocked users for authorization, defined in the package.json file.

On GitHUB one can find a working pipeline for the application with test running and linting.