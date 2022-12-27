# Calendar
This is a calendar developed from a template created by surajverma on github (https://github.com/surajverma/). The original features a different design and utlizes local storage for saving dates. You can check out his original project here: (https://github.com/surajverma/calendar/blob/master/calendar.png?raw=true). 

Huge shoutout to Suraj for putting this up online. Using his project as a base, I expanded the design and changed elements to allow for back end calls.

As of December 27th, 2022, this current version doesn't have an option for submitting dates, however modifying the backup.json file and following the format will allow the user to add in their own dates.

Goals for this project for 2023 include:
- Json database loads in with relevant date info - Find out how to write to it without breaching CORS
- Unhide code for modal operating on user input of dates, reason, vacation/appointment/personal day/funeral/etc.
- Store user generated inputs as JSON objects and apply them to backup.json
- Swap name of backup.json to something more formal
- Optimize code. Hide objects
- Remove localstorage interactivity, focus on json creation
