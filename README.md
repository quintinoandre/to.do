<br/>

## Installation

<br/>

1. Run on terminal:

```bash
yarn
or
npm i
```

2. Create and fill the ".env" file, following the example of the ".env.example" file.

3. Run the following command on terminal to create the database tables:

```bash
yarn migration:create
```

---

<br/>

## Running the app

<br/>

```bash
# development
yarn start
or
npm run start

# watch mode
$ yarn start:dev
or
npm run start:dev

# production mode
yarn start:prod
or
npm run start:prod
```

---

<br/>

## Documentation

<br/>

After install and running the app, the api documentation can be access through the following url: [http://host:port/api](http://host:port/api) (ex. http://localhost:3000/api)

---

<br/>

## Database

<br/>

To see the database, run the following command on the terminal:

```bash
yarn see:database
```

---

<br/>

## Test

<br/>

1. Create and fill the ".env.test" file, following the example of the ".env.test.example" file.

2. Run the following command on terminal to create the test database and tables:

```bash
yarn migration:create:test
```

3. To perform the tests, run the following commands on the terminal:

```bash
# unit tests
yarn test:unit
or
npm run test:unit

# e2e tests
yarn test:e2e
or
npm run test:e2e

# all tests
yarn test
or
npm run test
```
