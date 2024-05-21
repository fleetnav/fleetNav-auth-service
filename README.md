
# **FleetNav API**

The Bus Management API is a backend application designed to manage the administration of buses, drivers, and routes. This API allows owners and drivers to register, log in, and perform basic CRUD operations to access relevant information. The authentication service is crucial to ensure that only authorized users have access to the data and functionalities of the FleetNav system. Implementing robust authentication helps protect sensitive information and maintain the integrity of the system.


## Content Table

* What for?.
* For whom?
* Local Configuration.
* Running the App.
* Queries in Postman.
* Gitflow Branching Strategy.
* Participants.
* License.


## What for?

* **User Authentication:** Manages access through a robust JWT authentication system.
* **Data Validation:** Ensures data integrity with comprehensive validations on all inputs.
* **Role Management:** Controls access to different parts of the API based on user roles (owner, driver).


## For whom?

This service is aimed at:

1. **Fleet Owners:** Who need to securely manage their fleet of buses, drivers, and routes.
2. **Drivers:** Who need access to their personal and route information, ensuring that only they can view and modify their data.
3. **Developers:** Who work on extending or maintaining the FleetNav system and need to integrate or improve the authentication system.


## Local Configuration

To run the project locally, clone the repository and set up the necessary environment variables for the database and JWT.

1. Clone the repository:

    ``` bash
    git clone https://github.com/fleetnav/fleetNav-auth-service.git
    cd fleetNav-auth-service
    ```

2. Install the necessary dependencies:

    ``` bash
    npm install
    ```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:

    ``` bash
    cp .env.example .env    
    ```

    Edit the .env file and configure the following values:

    ``` bash
    DB_NAME = 'name collection'
    DB_CONNECTION = mongodb://
    DB_HOST = localhost:27017
    DB_USER = 'User MongoDB'
    DB_PASSWORD = 'Password MongoDB' 
    DB_HOST_CLOUD = 'Name DB'
    NODE_ENV = local
    JWT_SECRET = 'Yous Scret'
    ACCESS_TOKEN_EXPIRY = 'Expires in ...'
    ```

These steps will allow you to execute the project. Additionally, you must develop the environment variables according to your needs.


## Auth

- JWT secret generator command

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```


## Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Queries in Postman

You can test our API at https://documenter.getpostman.com/view/33425942/2sA3JT1cv7#a7aa1f6f-670c-4aae-a2bd-5cc0b3a7caf1 
to make queries about relevant information of drivers and owners.


## Gitflow Branching Strategy

This project follows the Gitflow strategy, a robust model for software development. Here is how the branches are organized and their purpose:

* `main:` Main branch with stable code for production. 
* `dev:` Development branch with the latest features before production. 
* `feature/CU-TaskId:` Feature branches with new functionalities, each identified by a Task ID in ClickUp.

The work is integrated into the 'dev' branch for integration testing. Once 'dev' is stable and ready to be released, it is merged into 'main'.

If you want to contribute to the project, create a new branch from 'dev' using the appropriate prefix (feature/CU-TaskId). After finishing your work and testing, open a Pull Request towards 'dev'.


## Participants

The participants involved in the execution process of the FleetNav project were:

* Julian Roman
* Camila Sepulveda


## License

Nest is [MIT licensed](LICENSE).
