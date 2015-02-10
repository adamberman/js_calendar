// Takes an array of POJOs, each with a start time and end time
// in minutes after 9:00 AM. Also is built to handle Event Title
// and Event Location.

// Required Args: start (number), end (number)
// Optional Args: eventTitle (string), eventLocation (string)

// Example: [{ start: 90, end: 180 }, {start: 120, end: 150}]
// Or: [{ start: 120, end: 240, eventTitle: "Brunch", eventLocation: "The Diner" }]

var layOutDay = function (events) {

	document.getElementById('col-2').innerHTML = '';

	function addClass (el, className) {
		if (el.classList) {
  			el.classList.add(className);
			} else {
  			el.className += ' ' + className;
		}

		return el;
	}

	function mergeSort(array) {
		
	}

	var sortedEvents = mergeSort(events);

	var eventTimes = [];

	events.forEach(function (event) {
		if (event.hasOwnProperty('start') && event.hasOwnProperty('end')) {
			var start = event.start;
			var end = event.end;

			for (start; start <= end; start ++) {
				if (eventTimes[start]) {
					eventTimes[start][0] = 2;
					eventTimes[start].push(2);
				} else {
					eventTimes[start] = [1];
				}
			}
		}
	})

	events.forEach(function (event) {
		if (event.hasOwnProperty('start') && event.hasOwnProperty('end')) {

			var template = document.getElementById('event-template').innerHTML;

			if (event.hasOwnProperty('eventTitle')) {
				template = template.replace('Event Title', event.eventTitle);
			}

			if (event.hasOwnProperty('eventLocation')) {
				template = template.replace('Event Location', event.eventLocation);
			}

			var start = event.start;
			var end = event.end;
			var maxOverlap = 1;
			var position = 0;

			for (start; start <= end; start ++) {
				var length = eventTimes[start].pop()
				if (length > maxOverlap) {
					maxOverlap = length;
				}
				if (start === end && length > 1) {
					// && (length > 1 && eventTimes[start].length === 0)
					position = 1;
				}
			}

			var el = document.createElement('DIV');
			addClass(el, 'event');

			el.style.height = String(event.end - event.start - 2) + 'px';

			if (maxOverlap > 1) {
				if (position === 0) {
					addClass(el, 'left');
				} else {
					addClass(el, 'right');
				}
			} else {
				addClass(el, 'full');
			}
			el.style.top = String(event.start) + 'px';

			el.innerHTML = template;
			document.getElementById('col-2').appendChild(el);


		} else {
			// raise error
		}
		// iterate through array
			// determine max elements it shares time with
		// place onto dom with width / max elements it shares time with
	})
}