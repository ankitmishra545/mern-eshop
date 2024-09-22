MERN-ESHOP

Project Github: https://github.com/ankitmishra545/mern-eshop
Project Link: https://mern-eshop-hwjs.onrender.com/

Clone: git clone https://github.com/ankitmishra545/mern-eshop

Two branches:

    - compose: This branch contains the docker-compose.yml file to run on docker

        -commands: To run on Docker desktop

            - Change branch from 'main' to 'compose'
            - Add environment variable in .env, sample is given in .env_dev file, for both 'client' and 'api'
            - cd mern-eshop
            - docker-compose up -d


    -main: This branch to run on local

Prerequisites

    - Node.js
    - VS Code
    -Two .env_dev files that have sample, to provide environment varaibles

        VITE_CLOUDANARY_KEY
        MONGO_CONNECTION_STRING
        JWT_SECRET_KEY
        REDIS_HOST
        REDIS_PORT
        REDIS_PASSWORD

Installation - git clone https://github.com/ankitmishra545/mern-eshop

    - cd mern-eshop

    -Install Dependencies and run server
        - npm install
        - npm run start

    -Run client open new powershell
        - cd client
        - npm install
        - npm run dev

Access the Application
-http://localhost:5173

URL of PROJECT: https://mern-eshop-hwjs.onrender.com/

admin_information:

    - email: "admin@mail.com", password: "admin"
    - email: "admin@gmail.com", password: "admin"

user_information

    - email: "user@mail.com", password: "user"
    - email: "user@mail.com", password: "user"
