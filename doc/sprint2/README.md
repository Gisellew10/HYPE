# HYPE

HYPE is a social media platform that serves as a bridge connecting aspiring students seeking work experience with startups/companies in search of interns.

* Improves the internship search process by empowering students to showcase their skills and personality through video resumes, using a TikTok-like format. Startups/companies can effortlessly browse through these dynamic videos, making selections based on their specific needs and cultural fit.

* Uses AI to analyze the videos and profiles of both students and startups and recommend the best matches based on their preferences and compatibility.

* Features competitions, fostering collaboration and allowing companies to identify talent in real-world scenarios.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CSCC012023/final-project-s23-git-hype
   ```
2. Install and Start the Project
   ```sh
   # frontend init.
   cd frontend
   npm install
   
   # backend init.
   cd ..
   cd backend
   npm install
   nodemon # or you can do npm start
   ```
3. Add .env
   ```sh
   touch .env
   ```
4. Add following to .env: 
   ```sh
   DB_STRING=mongodb+srv://gisellewang17:30U6ca4967i3HSyI@cluster0.l49mrhj.mongodb.net/HYPE?retryWrites=true&w=majority
   PORT=4000
   ```

   
## Motivation

The motivation behind the project is connecting students looking for work experience to startups/companies looking for interns. Many university students who are looking to gain useful work experience aren't able to find the internship which they need or which matches their abilities. There are limited positions available and many good students don't get the chance to gain useful work experience.

## Contribution
At this stage, our project will not open to contributions.

### Q&A
1. Do you use git flow?

&nbsp; &nbsp; Yes, we use git flow in our project.

2. What do you name your branches?

&nbsp; &nbsp; The associated Jira ticket number followed by a very brief (1 line) description.

3. Do you use github issues or another ticketing website?

&nbsp; &nbsp; We use Jira.

4. Do you use pull requests?

&nbsp; &nbsp; Yes, we use pull requests in our project.