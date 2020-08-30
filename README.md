# Team-235-Backend

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7e3b59263ac14426a1cf9e6472f3a445)](https://app.codacy.com/gh/BuildForSDGCohort2/Team-235-Backend?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDGCohort2/Team-235-Backend&utm_campaign=Badge_Grade_Dashboard)

This is the backend repository for the Stock Tracker Web Application For Team 235 Group A.

This project uses the Nestjs Framework. The reason for using this Typescipt based Framework over other micro frameworks like Express, Koa, Hapi etc. is that Nestjs gives us an opinionated structure which is very important especially when working on a team.

**Steps to reproduce this Repository:**

1.  In your terminal, clone this repository using the command:  
`git clone https://github.com/BuildForSDGCohort2/Team-235-Backend` 

2.  Switch to the repository folder and create a `.env` file in the root of the project. Copy the contents in `.env.sample` into this file and replace all keys with your own. 

3.  Run `npm install` to install all packages. 

4.  Run all migrations using the following command: `npm run knex migrate:latest`

5.  Run all seed files using the following command: `npm run knex seed:run`
 
6.  Run `npm run start:dev` to run the project in development. 
