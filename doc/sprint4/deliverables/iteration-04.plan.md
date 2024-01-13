# Git Hype


## Sprint 4 - Plan

 * Start date: 22nd July 2023
 * End date: 4th Aug 2023


## Process

In short, we plan our sprint on the Saturday after it starts, breaking down tasks to be completed during that meeting. We self-assign those tasks and work on them during the sprint, and we merge the results to dev when complete.


#### Changes from previous iteration

* This sprint will be the last sprint for this course, and given that there will be a final presentation after its completion, we’re changing our definition of done again to include not just merging our code to dev, but also integrating it with all other code on dev when it’s merged. This should cover situations where two people write pieces that need to interact in time for our final presentation.
* As we managed to coordinate effectively last sprint without our Tuesday meetings, we won’t be scheduling them this sprint. This should reduce the amount of time team members have to spend in meetings instead of writing code. It should also remove any confusion over whether these informal meetings were happening and when / where.


#### Roles & responsibilities

We are still not explicitly assigning roles to team members. Each team member can assign themselves to tasks they want to take on on Jira, and the team collectively is responsible that they all get done.

That said, we are continuing with the same team members as the previous sprint being primarily responsible for each deliverable document:
* Iteration plan & Sprint review - Alex
* Burndown chart - Sanjay
* Schedule - Pan
* System design document - Jawad
* Updating product backlog - Giselle
* Updating other documentation - Katy


#### Events

We met on Saturday July 22nd, both to perform our retrospective on our recently completed sprint and to plan the one we were beginning. We agreed on the user stories to tackle this sprint and broke them down into smaller tasks. This sprint, we have opted not to have Tuesday meetings, and will instead allow team members to reach out to each other directly and otherwise communicate via our standups.


#### Artifacts

Similarly to the last sprint, we have a Jira board with the tasks (broken down from larger user stories) we aim to complete this sprint, which is our primary means of organizing the tasks we have to complete and who will handle each one. We also plan to communicate via our daily standups to keep informed of project progress and identify any impediments the team is facing.

In our first meeting, we chose a team member to be primarily responsible for each deliverable, as described in the roles section, and we are continuing with these assignments. This is our main strategy of making sure all of the deliverables are completed. Assignments were originally made based on team members volunteering for each task.


#### Git / GitHub workflow

We have a main branch and a dev branch, plus individual branches managed by whoever creates them. All new development is made off of the dev branch, and all tasks are considered completed only when their functionality is merged into the dev branch, and integrated with any other code in dev as needed. Pull requests to the dev branch must be approved by at least one other team member (not the creator of the pr) before being merged. We don’t have any specific requirements on what team member approves the pull request, and as long as it’s approved, anyone can merge it. At the end of the sprint, dev gets merged into main, and everyone has the chance to test the functionality of dev when this happens.

Branches should include the ticket number of the Jira ticket(s) that the branch addresses, and optionally the name(s) of the team members who worked on the code in it. These are both to make it more clear at a glance what the branch is for and who can be contacted about it if necessary. Having the Jira ticket number at the start of the branch name also connects that Jira ticket and that branch through automatic integration of Github and Jira.


## Product


#### Goals and tasks

Our sprint goal for this sprint is “Student Participation in Competitions and Preparation for Final Presentation”. Our tasks that we intend to complete this sprint include:

* Student User View List of Competitions - Jawad
* Startup User View Created Competitions - Jawad
* Student User Signup for Competitions - Giselle
* Startup Sees Info On Students Who Sign Up For Their Competitions - Giselle
* Nav Bar Fixes & Startup Nav Bar - Katy
    * Fix the Nav Bar alignment
    * Nav Bar Should Highlight The Page The User Is Viewing
    * Long Names Should Not Word Wrap to Multiple Lines in Nav Bar
    * Text colour / Font change
    * Home page icon should link to home page
    * Add a Nav Bar for Startups
* Student and Startup Profiles Should Have a Name - Sanjay
* Student / Startup Profile Profile Icon Size / Alignment - Alex
* Student Profile Page Bottom Of Page Should Not Shrink Less Than View Height - Denise
* Student Profile Page Search Should be Background Colour with Spaces Between - Denise
* Accessing a Profile Page When Not Logged In Should Redirect To Home Page - Sanjay
* Remove School From Student Database Structure, and Use Education Array Instead - Pan
* Adding a New Group on Chats Page Should Not Require Page Refresh To Display - Katy
* Show An Error When Logging In With Incorrect Credentials - Sanjay
* Add Page for Internships to Link To - Katy
* Remove white border on logout page - Denise
* Remove White Scroll Bars on Messages Page - Denise
* Alignment of Top of Picture and Create Account on Student Signup Page - Denise
* Readability of Homepage - Sanjay
* Individual Chats Should Display User's Profile Image - Pan
* Picture on Login And Signup Page Takes Too Long To Load - Alex
* Signup & Login Pages White Corners Need Removing - Denise


#### Artifacts

The artifacts we will produce this sprint are the same as we did for the last sprint:

* the code itself, which will be uploaded to GitHub, and is important because it is the actual project
    * this is effectively an interactive mockup in addition to being the end goal, since it can be run locally to demonstrate the functionality of the project when done
* a wireframe of the intended layout of the project, created in figma, to guide our development efforts

* while it is not something we ourselves created, the founder has provided some example features created on Bumble that he would like us to use to help guide our development efforts as well




