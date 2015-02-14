// Takes an array of POJOs, each with a start time and end time
// in minutes after 9:00 AM. Also is built to handle Event Title
// and Event Location.

// Required Args: start (number), end (number)
// Optional Args: eventTitle (string), eventLocation (string)

// Example: [{ start: 90, end: 180 }, {start: 120, end: 150}]
// Or: [{ start: 120, end: 240, eventTitle: "Brunch", eventLocation: "The Diner" }]

var layOutDay = function (events) {

	document.getElementById('col-2').innerHTML = '';

	events.sort(function (a, b) {
		if (a.start < b.start) {
			return -1;
		}
		if (a.start > b.start) {
			return 1;
		}
		return 0;
	});
}