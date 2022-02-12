# airbeanb-clone


1. Clone this repo at: 
   - git@github.com:casey-cochran/airbeanb-clone.git


2. CD into the root directory and install dependecies with 
   - npm install


3. Create a POSTGRESQL user with the ability to create DB
   -CREATE USER 'username' WITH PASSWORD 'password' CREATEDB;
   
4. CD into the backend directory and create a .env file in the root, refer to .env.example
    -Fill out file with your desired PORT (5000 preferred), database name/username/password, and a secured JWT_SECRET.
    
5. Add this proxy ti your package.json within the frontend directory, replacing or keeping the port defined in your .env file.
    - "proxy": "http://localhost:5000"

6. Create the database and run the migrations then seeders.
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all

7. To start the backend directory
    -npm start
    
8. To start the frontend which will default to opening in your browser, if not navigate to http:/localhost:3000
    -npm start
    
10. Sign up or login in as a Demo User to explore the site freely. 
