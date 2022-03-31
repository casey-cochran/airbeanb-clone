## Welcome to my airbnb clone 
   
   This was my first solo react project in which I attempted to make a light clone of airbnb. I took most stylistic designs from airbnb
   themselves, but also incorporated my own design choices in certain areas of the application. While browsing this application as a user
   you are able to create a spot listing, edit that listing, view your listings, and delete that listing. As a user you can also view all 
   listings made from other users and book a listing for an upcoming vacation. Even non-users are able to explore the application to an extent. 
   They are able to view the home page as well as view all the listings, but if they try to create or book a listing, they will be prompted
   to signup or login. 
   
   As my first solo project I faced a lot of difficulties with rendering data and structuring my redux state. Given only 1 week to accomplish
   this project after having just learned react/redux for 2 weeks, it was definitely a challenge. It goes to show that with dedication and
   diligence, anyone can accomplish their goal. I hope to come back to this project in the future and continue working on new features such
   as incorporating reviews, search, and integegrating google maps API. 
   
## Live link
   
   * To experience this application immeditaly please navigate to https://airbeanb.herokuapp.com/ and sign up or login as a demo user!


1. Clone this repo at: 
   - git clone git@github.com:casey-cochran/airbeanb-clone.git


2. CD into the root directory and install dependecies with 
   - npm install


3. Create a POSTGRESQL user with the ability to create DB
   - CREATE USER 'username' WITH PASSWORD 'password' CREATEDB;
   
4. CD into the backend directory and create a .env file in the root, refer to .env.example
    - Fill out file with your desired PORT (5000 preferred), database name/username/password, and a secured JWT_SECRET.
    
5. Add this proxy ti your package.json within the frontend directory, replacing or keeping the port defined in your .env file.
    - "proxy": "http://localhost:5000"

6. Create the database and run the migrations then seeders.
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all

7. To start the backend directory
    - npm start
    
8. To start the frontend which will default to opening in your browser, if not navigate to http:/localhost:3000
    - npm start
    
10. Sign up or login in as a Demo User to explore the site freely. 
