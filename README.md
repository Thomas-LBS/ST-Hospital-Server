# Ironhack-Project-3-S.T. Hospital - MERN App (MongoDB, Express, React, Node)

<h1>Links</h1>

<h3>Follow the Trello Board : <a href="https://trello.com/invite/b/LJqzCzCl/ATTI2457db54afb77558ab662601bc60a286E6926B91/ironhack-project3-st-hospital" target="_blank">Here</a></h3>

<h3>Slides presentation : <a href="https://slides.com/thomaslebas/sthospital#/presentation/1" target="_blank">Here</a></h3>

<h3>Github Server repository : <a href="https://github.com/Thomas-LBS/ST-Hospital-Server.git" target="_blank" >Here</a></h3>

<h3>Github Client repository : <a href="https://github.com/Sunitha-Arockia-Dass/ST-Hospital-Client.git" target="_blank" >Here</a></h3>

<h3>App Server deployed with adaptabe : <a href="https://st-hospital-server.adaptable.app/" target="_blank">Here</a></h3>

<h3>App Client deployed with Netlify : <a href="https://6572201300d1c000a6662a33--musical-buttercream-e1a1d2.netlify.app/#/" target="_blank">Here</a></h3>

<h3>App Client deployed with Netlify : <a href="https://6572201300d1c000a6662a33--musical-buttercream-e1a1d2.netlify.app/#/" target="_blank">Here</a></h3>

<h1>Introduction</h1>
This project is an hospital website that allow patient to book and manage appointments and see their past records, doctor can manage their appointments ,create and view patient records and admin can create another admin,departments, doctors ,doctor credentials.

<h2>Technical Accomplishments</h2>
- Have a SPA frontend, built with React, consisting of multiple views and implementing CRUD actions.
- Have a REST API backend built with ExpressJS, MongoDB and Mongoose, that your React app will communicate with.
- Have 6 database models . 
- Have a REST API backend with routes that perform all CRUD actions for3 models (excluding the user model).
- Included sign-up, log-in and log-out functionality with encrypted passwords (or social login) and authorization (logged-in users can do additional things).
- Have two separate repos on GitHub. One repo is for your frontend React application and the other is for your backend REST API.
-  Secure JWT authentication for user protection.

- a backend validation and centralized error handling in your REST API.


<h2>Tools</h2>

- Ironlauncher
- React Vite
- Full calendar
- Gsap
- Mailjet
- axios


## CRUD

<h2>User</h2>
User can sign up to create an account, they can access their data and update them.

<h2>Appointments</h2>
User can create an appointment, edit their appointement and delete it.

<h2>Departements</h2>
Admin can create, update, delete departements.

<h2>Doctors</h2>
Admin can create, update, delete doctors.

<h2>Patient Record</h2>
doctor can create and view patient records.


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

All members can access Departments, only admin car Create, Update, Delete.

## General Practices

All members can access General Practices.

## Account Page

All members can access Account Page.

Patient : 
  - see his user data, edit them.
  - see his GP info, edit them.
  - create his appointments, edit/delete them.
  - see patient records.

Doctor : 
  - see his appointments.
  - see his patient's records.

Admin : 
  - CRUD Departments.
  - CRUD Doctors.
  - Create doctor or admin rights.

## Tools used

<h2>MongoDB & Mongo Atlas</h2> for the DB.

<h2>Mongoose</h2> for models.

<h2>jwt</h2> to create secure token for auth.

<h2>Bcrypt</h2> to crypt password and check them.

<h2>Axios</h2> to handle and fetch API.

<h2>emailJS</h2> to send appointments data by email.

<h2>GSAP</h2> to animate.

## Installation
1. Clone the repository:
https://github.com/Thomas-LBS/ST-Hospital-Server.git
https://github.com/Sunitha-Arockia-Dass/ST-Hospital-Client.git

# Install dependencies for the client and server:
cd ST-Hospital-Server
npm install
cd ST-Hospital-Client
npm install
1. Set up MongoDB Atlas:
Create a MongoDB Atlas account.
Configure a new cluster and obtain the connection string.
Replace the MongoDB connection string in server/config/default.json with your own connection string.
2. Start the application:
# Start the server (from the server directory)
npm start
# Start the client (from the client directory)
npm start