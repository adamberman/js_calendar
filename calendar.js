// Takes an array of POJOs, each with a start time and end time
// in minutes after 9:00 AM. Also is built to handle Event Title
// and Event Location.

// Required Args: startTime (number), endTime (number)
// Optional Args: eventTitle (string), eventLocation (string)

// Example: { startTime: 90, endTime: 180 }
// Or: { startTime: 120, endTime: 240, eventTitle: "Brunch", eventLocation: "The Diner" }

var layOutDay = function (events) {

	var eventTimes = [];

	events.forEach(function (event) {
		if (event.hasOwnProperty('startTime') && event.hasOwnProperty('endTime')) {
			var start = event.startTime;
			var end = event.endTime;

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
		if (event.hasOwnProperty('startTime') && event.hasOwnProperty('endTime')) {
			var template = document.getElementById('event-template').innerHTML;

			if (event.hasOwnProperty('eventTitle')) {
				template.replace('Event Title', event.eventTitle);
			}

			if (event.hasOwnProperty('eventLocation')) {
				template.replace('Event Location', event.eventLocation);
			}

			var start = event.startTime;
			var end = event.endTime;
			var maxOverlap = 1;
			var position = 0;

			for (start; start <= end; start ++) {
				var length = eventTimes[start].pop()
				if (length > maxOverlap) {
					maxOverlap = length;
					if (eventTimes[start].length === 0) {
						position = 1;
					}
				}
			}

			var el = document.createElement('DIV');
			if (el.classList) {
  			el.classList.add('event');
			} else {
  			el.className += ' ' + 'event';
			}
			el.style.width = String(594 / maxOverlap) + 'px';
			el.style.height = String(event.endTime - event.startTime) + 'px';
			el.style.top = String(15 + event.startTime) + 'px';
			if (position === 0) {
				el.style.left = '10px';
			} else {
				el.style.left = '310px';
			}

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