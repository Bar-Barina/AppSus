# AppSus

AppSus is a simple web application built using Vue.js that allows users to send and receive emails, manage their notes, and store their favorite books.

## Features

AppSus includes the following features:

- Email: Users can compose and send emails to other users. They can also view their inbox and read messages that have been sent to them.
 <img src="https://i.gyazo.com/6599ea160f8f7a61c573f4621e6bd9b8.png" />

- Notes: Users can create, edit, and delete notes. They can also view a list of all their notes.
<img src="https://i.gyazo.com/b0189beeeece8af2304c21725e8cc645.png" />

- Books: Users can search for books using Google Books API and save them to their favorites. They can also view a list of all their favorite books.

## Getting Started

To run AppSus on your local machine, you'll need to follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies using npm or yarn. Run `npm install` or `yarn install` in the root directory of the project.

3. Create a file named `.env.local` in the root directory of the project and add the following environment variables: 
VUE_APP_EMAILJS_USERID=<your emailJS user ID>
VUE_APP_EMAILJS_TEMPLATEID=<your emailJS template ID>
VUE_APP_EMAILJS_SERVICEID=<your emailJS service ID>

4. Start the development server by running `npm run serve` or `yarn serve`.

5. Open your browser and navigate to `http://localhost:8080` to view the app.

## Contributing

If you'd like to contribute to this project, feel free to fork this repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
