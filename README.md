# FightCard

Source repo for completed Stream AMG assessment task - Fight Card. 

# Overview
## Components
1. `fight-card-desktop.component` - top level component consisting of main title, subtitle and embedded timeline. initially considered having separate desktop and mobile components for responsive design - hence the '-desktop' name appendage - ended up using css media-queries instead.
2. `timeline.component` - embedded by `fight-card-desktop.component` - initially wanted to make this a generic timeline component that would accept config data from parent, but the specific layout, formatting and styling needed for the fight-card data was too much to be able to pass in so it is a bespoke component for the fight-card timeline specifically. Also contains an exported interface for the type-definition of the input parameter it accepts from the parent `fight-card.component`.
3. app.component - standard bootstrapped component. Used routing, so it embeds a router-outlet, to facilitate route nav. Single route added to reach `fight-card-desktop.component` - `/fight-card` 

## Styles
1. `styles.scss` - global styles used across component scss. Imports scss variables, bootstrap css and provided font css.
2. `variables.scss` - global scss variables used by styles.scss and component scss
3. `fight-card-desktop.scss` / `timeline.component.scss` - view encapsulated component-specific styles

## Services
1. `static-data.service` - service providing a single function for data access to the provided json data file. Uses `HttpClient` to HTTP GET the data via AJAX, in the exact same way I implement real REST HTTP API requests. Returns the Observable for consumer (component) for susbcription handling internally.

## Assets
1. `data.json` - the static data provided for use in the assessment.
2. `images` - the 5 source images provided for use in the assessment on figma.

## Additional dependencies (npm modules) used
1. bootstrap 4 - standard html framework with a pusedo-grid system built on flex. Used to handle some responsive view behaviour "for free" via use of the responsive column classes it provides.

## Summary / description
The top-level component is reached at the `/fight-card` relative route. The main component contains the main title and subtitle (date/location info for the fights), and embeds the `timeline.component` component. It invokes the `static-data.service` to request the static data from `/assets` via HTTP, unpacks it in the subscription handler for the service method call and assigns local variables used in template bindings. 
`timeline.component` is the bulk of the impl. It receives input for the matches and fighter data via 1-way bindings from the parent `fight-card.component` - the type of this input param is defined by the `TimelineData` interface also exported within this component. The fight and fighter details are rendered on a "timeline", as per the figma designs, using the ngFor directive against the array of data passed in. implements the fight-selection functionality via a `(click)` event binding, passing in the current data-item of the directive loop, which is assigned to a local `selectedFightRow` variable. This is used in one of a number of `[ngClass]` bindings, which facilitate conditional styling such as the gold-colouring of the timeline item for the final fight and the highlighting (larger text, brighter colouring) of the selected fight in the timeline. In addition to the timeline, the fight images are displayed in a single `<img>` element. The transition animation between images is achieved via another `[ngClass]` binding that conditionally applies full opacity to the element in a linear transition (its set to 0 opacity - transparent - by default in the comopnent css) based on a local boolean variable which is set to false by the `(click)` callback for setting `selectedFightRow`. A `(transitionend)` event binding triggers the update of the `<img>`'s src bind-variable `fightImageSrc` to the relative `/assets` location for the `selectedFightRow` image upon completion of the "fade-out" animation. a Combination of bootstrap pre-canned column classes and varying css @media queries are used to achieve responsive design at varying viewport sizes - manually tested via chrome devtools device toolbar using both the "responsive" device for variable sizes and the preset mobile/tablet device configs.
At both mobile and full-desktop size viewports the implemented solution is a highly accurate actualisation of the figma designs, and the extensive @media queries used ensure an aeshetically pleasing and engaging view and UX is maintained at all sizes in between.

## Running the application
1. Clone this repo
2. `npm ci` from the resulting working directory - `ci` not `i` to ensure the specific versions of the npm deps that were installed last time a successful build was achieved are installed, and avoid any semver upversioning and undesired consequences thereof.
3. `ng serve` from the working directory
4. navigate to `localhost:4200/fight-card` in chrome to view the application




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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
