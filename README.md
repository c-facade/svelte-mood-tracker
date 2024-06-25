# Svelte Mood Tracker

Check it out: [Mood Tracker](svelte-mood-tracker.pages.dev).

Svelte Mood Tracker is a web application that allows the user to track their activities, feelings and overall mood.

This is a project for the course Web Application Development(Sviluppo di Applicazioni Web) at the University of Pisa.
This application is written using Svelte-kit and hosted on cloudflare pages.
It uses Svelte Material UI for some basic components, and chart.js to draw charts.

## Specifications

This application will:

- Allow the user to record data on their mood
- Show diagrams showing overview and correlations.
- Use end-to-end encryption to ensure complete privacy
- Send notifications to remind the user to insert data and view weekly/monthly reports.
- Work offline and synchronize when it's back online.


## Next

To do:

- add more default activities
- notifications
- make new example user

Less urgent(but necessary for release):

- work on accessibility
- work on loading styles faster
- add some insights on mood.
- add security rules.
- add encryption.
- switch to other firebase configuration or to supabase.
- choose a real name for the application.
- better logo.

Future improvements:

- Possibility to edit or delete diary pages.
- More insights.
- See archived activities and restore them.
- Tell user weather they're online or not (catch firebase error).
- introduce activity icons (with icon picker)
- allow activities to have a numeric value.
- calculate correlations between activities and moods.
- divide activities into feelings/symptoms and activities.
