# Ironhack-Project-3-S.T. Hospital - MERN App (MongoDB, Express, React, Node)

<h1>Links</h1>

<h3>Follow the Trello Board : <a href="https://trello.com/invite/b/LJqzCzCl/ATTI2457db54afb77558ab662601bc60a286E6926B91/ironhack-project3-st-hospital" target="_blank">Here</a></h3>

<h3>Slides presentation : <a href="#" target="_blank"></a></h3>

<h3>Github Server repository : <a href="https://github.com/Thomas-LBS/ST-Hospital-Server.git" target="_blank" >Here</a></h3>

<h3>Github Client repository : <a href="https://github.com/Sunitha-Arockia-Dass/ST-Hospital-Client.git" target="_blank" >Here</a></h3>

<h3>App Server deployed with adaptabe : <a href="https://st-hospital-server.adaptable.app/" target="_blank">Here</a></h3>

<h3>App Client deployed with Netlify : <a href="https://6572201300d1c000a6662a33--musical-buttercream-e1a1d2.netlify.app/#/" target="_blank">Here</a></h3>


<h1>Introduction</h1>
This project is an hospital website that allow patient to take appointments, doctor can manage patient records and admin can create departments, patient, doctors.

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

<h2>Tools</h2>

We used Ironlauncher --auth for the server, react vite for the client part, axios is used to get the datas from the server.


## UX/UI Choices

<h2>Fonts</h2>

  --ft-Headings: "Sofia Sans", sans-serif;
  --ft-Texte: "Poppins", sans-serif;

<h2>Color Palette</h2>

  --clr-light: hsl(220, 10%, 95%);
  --clr-medium: hsl(220, 10%, 30%);
  --clr-dark: hsl(220, 10%, 12%);
 
Light blue is a peaceful, calming color. According to color psychology, blue is associated with trustworthiness and reliability. Blue is also said to promote feelings of tranquility; light blue’s gentle appearance means it is particularly likely to make that impression.
  --clr-blue: hsl(193, 90%, 53%);
  --clr-blue-medium: hsl(193, 90%, 25%);

Green is the result of mixing blue and yellow. Green has two paradoxical meanings—one being nature and the environment and the other being money. When it comes to nature, green represents renewal and growth. It is also associated with wealth, prestige, and greed.
  --clr-green: hsl(157, 95%, 53%);
  --clr-green-medium: hsl(157, 95%, 25%);

message to the user colors :
  --info-msg: hsl(290, 55%, 53%);
  --ok-msg: hsl(70, 55%, 53%);
  --careful-msg: hsl(35, 55%, 53%);
  --danger-msg: hsl(0, 55%, 53%);


## DARKMODE
using JS DOMmanipulation to change the mode of the browser, the css, register user choice to the localstorage.
Colors : 
  --foreground: var(--clr-light);
  --background: var(--clr-dark);
  --clr-medium: hsl(220, 10%, 77%);
  --clr-blue-medium: hsl(193, 90%, 77%);
  --clr-green-medium: hsl(157, 95%, 77%);


## LANGUAGES
using react usecontext for french or english, just to show how it works on the navbar.


## CRUD

<h2>User</h2>
User can sign up to create an account, he can acces to his data and update them.

<h2>Appointments</h2>
User can create an appointments, change his appointement, delete it.

<h2>Departements</h2>
Admin can create, update, delete departements.

<h2>Doctors</h2>
Admin can create, update, delete doctors.

<h2>General Practitioner (GP)</h2>
Admin can create, update, delete GP.

<h2>Patient Record</h2>
doctor can create, update, delete doctors.




## MONGOOSE MODELS
<ul>
  <li>User.model.js for user account with feedback</li>
  <li>Appointment.model.js for react Fullcalendar Appointments with feedback</li>
  <li>Department.model.js for hospital departements with feedback</li>
  <li>Doctor.model.js for hospital doctors with feedback</li>
  <li>GPractice.model.js for hospital General Practitioners with feedback</li>
  <li>PatientRecord.model.js for hospital Patient Record with feedback</li>
</ul>


## Departements

All members can accès Departments, only admin car Create, Update, Delete.

## General Practices

All members can accès General Practices, only admin car Create, Update, Delete.

## Account Page

All members can accès Account Page.

Patient : 
  - see his user date, edit them.
  - see his GP, edit him.
  - see his appointments, edit them.
  - see his past appointments, and consult patient records.

Doctor : 
  - see his appointments.
  - see his patient records.

Admin : 
  - CRUD Departments
  - CRUD GP
  - CRUD Doctors
  - Update doctor or patient administration rigth
  - Create Users (patient, doctors, admin)


## API used

<h2>MongoDB & Mongo Atlas</h2> for the DB.

<h2>Mongoose</h2> for models.

<h2>jwt</h2> to create secure token for auth.

<h2>Bcrypt</h2> to crypt password and check them.

<h2>Axios</h2> to handle and fetch API.

<h2>emailJS</h2> to send appointments data by email.

<h2>GSAP</h2> to animate.

"tchatjs/socketIO WIP"