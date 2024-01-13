# Git Hype

## Sprint 2 - Retrospective

 * When: July 8th 2023
 * Where: Student Center on Campus

## Process - Reflection

#### Decisions that turned out well

* Breaking our Jira tasks into smaller and more manageable chunks at the start of the sprint worked out well. It allowed for clearer estimates and easier coordination between team members (as team members had a better idea what each other were working on and could sign up for more specific tasks at a time)
* Changing our definition of done to include merging the working functionality to the dev branch worked out as it helped lower the number of merge conflicts that needed fixing at the end of the sprint.

#### Decisions that did not turn out as well as we hoped

* Many team members started working on their tasks the last week before the end of the sprint. While it’s important to prioritize other classes appropriately, this led to trying to manage changes in many parts of the program at once, and with little time left to reconcile those changes.
* On the day before the due date, we accidentally deleted our documentation on the main branch, when we merged our dev branch into main, which led to a bit of a scramble to get copies of each document uploaded again before the due date.


#### Planned changes

* This sprint, we plan to start earlier, and will be beginning our group standups earlier in the week to encourage this and to improve team coordination prior to the last week. Exact start date will be decided during our Tuesday meeting. This should allow for a more consistent rate of change of the project across the sprint.
* Future documentation and sprint deliverables will be committed to our dev branch instead of our main branch and will be copied to main with our code from dev. This should prevent another situation like last sprint where our sprint deliverables that were committed directly to main were deleted when we merged our code from dev into main.

## Product - Review

#### Goals and/or tasks that were met/completed:

* Creating All Students Page with Filtering Options
* Creating Cue Cards Versions of Profiles to be put in All Students Page
* Student User Homepage Navigation Bar
* Creating a Popup for Sending a Message when Clicking Message on one of the Cue Cards
    * Popup is completed, but is currently coded to only send to a specific person, and needs to be made dynamic.
* Displaying Messages in the Frontend
* Fetching Messages from the Backend
* Add 'Create Group' and 'Invite to Group' Buttons on Messages Page
* Fix Ability to View Profile in Dev Branch for Startups and Students
* Student User Edit Profile & Startup User Edit Profile
    * While basic editing was added, data which is saved as arrays still needs a front interface that allows adding and editing entries in the array.

#### Goals and/or tasks that were planned but not met/completed:

* Sending a new message 
    * Dependence on other changes meant this was started late, and is not completed yet.
* Sending a new message from the all students page 
    * It is completed with only one specific user at the moment, but we were unable to complete it for all users by the end of the sprint. 
* Connecting the Create/add members models to a button on the chat page
    * Depended on other changes, and was  not able to start and complete the work needed by the end of the sprint 
* Editing arrays of information in student and startup profiles
    * Was not met because a responsive user interface to allow for these more involved changes turned out to be more complicated than expected.
* Connect students LinkedIn 
    * Dependence on the ability to edit these links in the student profile delayed working on the ability to connect to LinkedIn from a short student profile.

## Meeting Highlights

Going into the next iteration, our main insights are:

* Starting earlier will allow us to better manage the project timeline and ensure we get tasks done on time. A more flexible process for submitting standups, starting earlier in the sprint than it did in the last one, should help facilitate this.
* Another key insight is the importance of frequent merges during the development process to prevent merge conflicts.
* We have adopted the practice of always committing changes to the dev branch first for all commits, documentation and sprint deliverables.
* It’s becoming clear that some features will need to be revisited to make them as useful and presentable as possible for the final project presentation, and a general shift in focus from more features quickly to the quality of the features produced should guide our current and future development for the remainder of the project.



