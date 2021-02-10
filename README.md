# POEM KEEPER

![Imgur Image](https://imgur.com/dDMoAbX.png)
![Imgur Image](https://imgur.com/75p6fif.png)

## SUMMARY

This application gives users a space to create and maintain their personal collection of poems. Users can add new poems to their list by providing a title, poem body and defining the mood and temperature of the poem which defines the poems background style. The user can select a poem from the list to view an expanded screen containing the poems content and style, As well as options for editing the poem or deleting it entirely.

### LINKS

- API REPO: https://github.com/KasperKain/poem-app-server
- CLIENT REPO: https://github.com/KasperKain/poem-app-client
- LIVE LINK: https://poem-app-client.vercel.app/

## Front-End technologies

- React
- React Router
- React Context
- Jest
- Deployed via Vercel

## Back-End Technologies

- Node
- Express
- Mocha, Chai
- Supertest
- PostgreSQL
- Knex
- Deployed via Heroku

## API Documentation

### Endpoints

#### Style Endpoints

'GET /api/styles'

- Provides full list of poems saved

'POST /api/styles'

- Creates a new poem with designated style

'DELETE /api/styles/:id'

- Deletes a specific poem that matches endpoint id

'PUT /api/styles/:id'

- Updates all fields of the poem that matches endpoint id

#### Poem Endpoints

'GET /api/poems'

- Provides full list of poems saved

'POST /api/poems'

- Creates a new poem with designated style

'DELETE /api/poems/:id'

- Deletes a specific poem that matches endpoint id

'PUT /api/poems/:id'

- Updates all fields of the poem that matches endpoint id

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
