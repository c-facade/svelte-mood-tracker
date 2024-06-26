# Svelte Mood Tracker

Check it out: [Mood Tracker](svelte-mood-tracker.pages.dev).

Svelte Mood Tracker is a web application that allows the user to track their activities, feelings and overall mood.

This is a project for the course Web Application Development(Sviluppo di Applicazioni Web) at the University of Pisa.
This application is written using Svelte-kit and hosted on cloudflare pages.
It uses Svelte Material UI for some basic components, and chart.js to draw charts.

## Specifications

This application will:

- Allow the user to record data on their mood
- Show diagrams showing overview of their mood.
- Send notifications to remind the user to insert data and notify online status.
- Work offline and synchronize when it's back online.

## Installation and build

To run this application in locale, clone the repository, then inside the project directory run:

	npm install
	npm run build
	npm run preview

Since the application is in the development stage, it's not necessary to verify the email. 
So, it is possible to test the application as a new user without sharing your own email.

## Next

## To do:

### Less urgent(only necessary for release):

- work on accessibility
- work on loading styles faster
- add some insights on mood.
- add security rules.
- add encryption.
- switch to other firebase configuration or to supabase.
- choose a real name for the application.
- better logo.

###  Future improvements:

- Possibility to edit or delete diary pages.
- More insights.
- See archived activities and restore them.
- introduce activity icons (with icon picker)
- allow activities to have a numeric value.
- calculate correlations between activities and moods.
- divide activities into feelings/symptoms and activities.

