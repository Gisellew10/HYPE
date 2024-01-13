# Git Hype

## Sprint 2

 * Start date: 17th June 2023
 * End date: 7th July 2023

## Process

Quick Introduction to the process

#### Changes from previous iteration

- Change to the definition of done: a task is done when it is working in the dev branch, instead of only working on a separate branch. This change is intended to prevent a buildup of merge conflicts toward the end of the sprint.
- During our initial meeting for this sprint, we broke down the relevant user sorties into smaller tasks than the user stories we initially started with. This was both to allow for more precise estimation and to let team members more dynamically assign themselves to tasks (and prevent single large tasks from becoming a single team member’s responsibility)

#### Roles & responsibilities

We are still not explicitly assigning roles to team members. Each team member can assign themselves to tasks they want to take on on Jira, and the team collectively is responsible that they all get done.

That said, we chose a person to be primarily responsible for each deliverable document:
- Iteration plan & Sprint review - Alex
- Burndown chart - Sanjay
- Schedule - Pan
- System design document - Jawad
- Updating product backlog - Giselle
- Updating other documentation - Katy

#### Events

Describe meetings (and other events) you are planning to have:

We met Saturday 17th June and plan to meet on Saturday 1st July. These meetings are primarily in-person in the student center on campus, but joining remotely is allowed for people who can’t make it in-person. There are also more-informal meetings after Tuesday lectures (obviously excluding reading week).

The June 17th meeting was our sprint planning meeting for this sprint. We agreed on the user stories to tackle this sprint and broke them down into smaller tasks. The July 1st meeting is planned to cover preparing for our demo in the week that follows that. The Tuesday meetings are in-person check-ins for any issues team members want to bring up. The founder is invited to the Saturday meetings, but only joined the June 17th meeting remotely at the end.

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

Similarly to the last sprint, we have a Jira board with the tasks (broken down from larger user stories) we aim to complete this sprint, which is our primary means of organizing the tasks we have to complete and who will handle each one. We also plan to communicate via our daily standups to keep informed of project progress and identify any impediments the team is facing.

In our first meeting, we chose a team member to be primarily responsible for each deliverable, as described in the roles section. This is our main strategy of making sure all of the deliverables are completed. Assignments were made based on team members volunteering for each task.

#### Git / GitHub workflow

We have a main branch and a dev branch, plus individual branches managed by whoever creates them. All new development is made off of the dev branch, and all tasks are considered completed only when their functionality is merged into the dev branch. Pull requests to the dev branch must be approved by at least one other team member (not the creator of the pr) before being merged. We don’t have any specific requirements on what team member approves the pull request, and as long as it’s approved, anyone can merge it. At the end of the sprint, dev gets merged into main, and everyone has the chance to test the functionality of dev when this happens.

Branches should include the ticket number of the Jira ticket(s) that the branch addresses, and optionally the name(s) of the team members who worked on the code in it. These are both to make it more clear at a glance what the branch is for and who can be contacted about it if necessary.


## Product

#### Goals and tasks

Our sprint goal for this sprint is “Student Communication”. Our tasks that we intend to complete this sprint include:

- Ability for students to view a list of other students, so that they can see people to potentially message
- Ability for students to send a message to another student
- Ability for students to view their ongoing conversations with other students
- Ability for students to sort the list of other students they could message
- Ability for students to create groups for messages with more than one person
- Ability for students to edit their profile information to change how they present themselves
- Ability for startups to edit their profile information as well

These same tasks, broken down to Jira tickets with the team member assigned to each:

- Creating Cue Cards Versions of Profiles to be put in All Students Page - Denise
- Student User Homepage Navigation Bar - Katy
- Fetching Messages from the Backend - Jawad
- Add 'Create Group' and 'Invite to Group' Buttons on Messages Page - Jawad
- Fix Ability to View Profile in Dev Branch for Startups and Students - Sanjay
- Creating All Students Page with Filtering Options - Pan
- Creating a Popup for Sending a Message when Clicking Message on one of the Cue Cards - Giselle
- Displaying Messages in the Frontend - Katy
- Student User Edit Profile - Sanjay
- Startup User Edit Profile - Alex

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

The artifacts we will produce this sprint are the same as we did for the last sprint:

- the code itself, which will be uploaded to GitHub, and is important because it is the actual project
    - this is effectively an interactive mockup in addition to being the end goal, since it can be run locally to demonstrate the functionality of the project when done
- a wireframe of the intended layout of the project, created in figma, to guide our development efforts

- while it is not something we ourselves created, the founder has provided some example features created on Bumble that he would like us to use to help guide our development efforts as well


