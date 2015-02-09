// Takes an array of POJOs, each with a start time and end time
// in minutes after 9:00 AM. Also is built to handle Event Title
// and Event Location.

// Required Args: startTime (number), endTime (number)
// Optional Args: eventTitle (string), eventLocation (string)

// Example: { startTime: 90, endTime: 180 }
// Or: { startTime: 120, endTime: 240, eventTitle: "Brunch", eventLocation: "The Diner" }

var layOutDay = function (events) {
	events.forEach(function (event) {
		if (event.hasOwnProperty(startTime) && event.hasOwnProperty(endTime)) {
			if (event.hasOwnProperty(eventTitle)) {
				// Place title into template
			}

			if (event.hasOwnProperty(eventLocation)) {
				// Place location into template
			}

			// place event into array based on times

		} else {
			// raise error
		}
		// iterate through array
			// determine max elements it shares time with
		// place onto dom with width / max elements it shares time with
	})
}