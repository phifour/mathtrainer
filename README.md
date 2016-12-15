Mathtrainer
=================================

Mathtrainer is to create and exchange math assignments.
The app is written in Angular2 and Typescript and ueses MathJax in order to reder equations (based on LaTex).
User can do assignments and create their own assignment. 

It uses the following concepts:

-)Third party package implementation MathJax
-)Firebase as backend
-)Angular2 Form validation


#### 1. Prerequisites

*nodejs* must be installed on your system and the below global node packages must be installed:

- gulp

> npm i -g gulp

- gulp-cli

> npm i -g gulp-cli

- typings

> npm i -g typings@1.3.3

- typescript

> npm i -g typescript@2.0.2

- ts-node

> npm i -g ts-node@1.3.0

#### 2. Cloning the repository

Clone the repository:

> git clone https://github.com/phifour/mathtrainer.git mathtrainer

> cd mathtrainer

#### 3. Installing dependencies

Install dependencies by running the following command:

> npm install

`node_modules` and `typings` directories will be created during the install.

#### 4. Building the project

Build the project by running the following command:

> npm run clean & npm run build

`build` directory will be created during the build

#### 5. Starting mathtrainer
Start the application by running the following command:

> npm start

The application will be displayed in the browser.
(http://localhost:8000/)

