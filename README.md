<img src="https://www.futurebrand.com/build/images/futurebrand-logo-2017.svg" width="250" height="33" alt="FutureBrand" />

# NextJS WordPress Stater | FutureBrand

## Production URLs

- Website URL - [mafrasaude.com.br](https://mafrasaude.com.br)
- Panel URL - [painelsite.mafrasaude.com.br/painel](https://painelsite.mafrasaude.com.br/painel)
- API URL - [painelsite.mafrasaude.com.br/api](https://painelsite.mafrasaude.com.br/api)

## Homolog URLs

- Website URL - [mafra.futurebrand.dev](https://mafra.futurebrand.dev)
- Panel URL - [futurebrand.dev/mafra/painel](https://futurebrand.dev/mafra/painel)
- API URL - [futurebrand.dev/mafra/api](https://futurebrand.dev/mafra/api)

## Project stack:

- React + [NextJS](https://nextjs.org)
- Lint (Eslint and Prettier)
- Precommit Lints

## IDE Setup

To maintain code quality and always have a standard across all of the team's
project has rules defined for javascript and css / scss. We use the Eslint /
Prettier for Javascript and Stylelint for SCSS. It is necessary to
integration of these rules with your favorite IDE. We recommend using Visual
Studio Code with the following plugins:

| Plugin   | README                                                                                     |
| -------- | ------------------------------------------------------------------------------------------ |
| ESlint   | [check plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |
| Prettier | [check plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |

## Pre-commit

Before running git commit, the rules of ESLint and Stylelint are executed. If
there is an error or some non-default code of the site will generate an error
and you will not be able to commit.

## Frontend

This is a [FutureBrand NextJS WordPress Stater](https://github.com/futurebrand/nextjs-wp-starter/)
project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### Update All Packages to the Latest Version

You just need to run `npx npm-check-updates -u` to upgrade all version hints in package.json, allowing installation of the new major versions.

### Getting Started

First, duplicate `.env.example` file, rename for `.env` and change the env variables.

Install all the dependencies

```bash
npm install
```

then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.
