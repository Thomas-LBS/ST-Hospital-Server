# Ironhack-Project-3-S.T. Hospital

<h1>Links</h1>

<h3>Follow the Trello Board : <a href="https://trello.com/invite/b/LJqzCzCl/ATTI2457db54afb77558ab662601bc60a286E6926B91/ironhack-project3-st-hospital">Here</a></h3>

<h3>Slides presentation : <a href="">Here</a></h3>

<h3>Github Server repository : <a href="https://github.com/Thomas-LBS/st-hospital-server.git">Here</a></h3>

<h3>Github Client repository : <a href="">Here</a></h3>

<h3>App deployed with Cyclic : <a href="">Here</a></h3>


<h1>Introduction</h1>

<h2>Technical Requirements</h2>
Your full-stack application must meet the following technical requirements:

- Have a SPA frontend, built with React, consisting of multiple views and implementing all CRUD actions.
- Have a REST API backend built with ExpressJS, MongoDB and Mongoose, that your React app will communicate with.
- Have a REST API backend with routes that perform all CRUD actions for at least one model (excluding the user model).
- Have 3 database models or more. Having one model for users is the first step. The other two (or more) models should represent the main functionality of your app.
- Include sign-up, log-in and log-out functionality with encrypted passwords (or social login) and authorization (logged-in users can do additional things).
- Have two separate repos on GitHub. One repo is for your frontend React application and the other is for your backend REST API.
- Have at least 2 commits per day that you worked on.
- Have a backend validation and centralized error handling in your REST API.
- Be deployed online, allowing anyone to access and use your app.
- As a final step, check all the features outlined in points 1 - 5 and ensure they are implemented and working ahead of delivery.


<h2>Deliverables</h2>
Students must submit the following deliverables in order for the project to be deemed complete:

- A working app that meets all technical requirements, built by you.
- A working app deployed on Fly.io/Netlify.
- The two URLs of your GitHub repositories (frontend and backend).
- The URL to the deployed React app.
- The URL of the slides for your project presentation.
- Your GitHub repos must have a README with the completed project documentation.
- Present and demo your app during the Final Project presentations.


## UX/UI Choices

<h2>Fonts</h2>
  --text: 'PT Sans', sans-serif;
  --title: 'Nunito', sans-serif;

<h2>Color Palette</h2>

The color plum is a symbol of new beginnings, enthusiasm and fresh energy. It is also a color that represents strength, determination and confidence :
--plumd: #CE78CE;
--plumm: #DDA0DD;
--pluml: #EED2EE;
--citrine: #EAD94C;
--plumdark: #963696;
--white: #ffffff;
--grey: #6b5f6b;
--black: #000000;

## CRUD

<h2>User</h2>
User can sign up to create an account, he can acces to his data and update them.

<h2>Members Profile</h2>
User can create members, each members can be updated, deleted and acces to 3 levels : details, agenda, healthify app.

<h2>Agenda</h2>
User can create appointments, each appointment can be updated, deleted or display to see details.

## MONGOOSE MODELS

<ul>
  <li>User.model.js for user account with feedback</li>
  <li>Profile.model.js for members profile with feedback</li>
  <li>Agenda.model.js for appointments with feedback</li>
  <li>Data.model.jsfor BMI calculator with feedback</li> 
</ul>

## Agenda

all members can accès to the same agenda.

## Healthify

this the art of the app that allow you to calculate and follow your BMI, depending on it you will have acces to healthy lifestyle to gain or loss weight depending of the last BMI and adapted to the user diet Paleo, Vegan or Vegetarian.

## app.js

contain the app.use informations

## routes folder

contain all the routes to display all the pages and run the form

## script.js

contain the javascript code for DOM manipulations

## API used

<h2>MongoDB & Mongo Atlas</h2> for the DB.

<h2>Our own API</h2> for the recipies DB using a JSON server deployed on Cyclic.

<h2>Cloudinary</h2> allow members to upload a profile picture.

<h2>Bcrypt</h2> to crypt password and check them.

<h2>Axios</h2> to handle and fetch API.

<h2>ChartJS</h2> to display BMI and nutrition graph.
