// Takes an array of POJOs, each with a start time and end time
// in minutes after 9:00 AM. Also is built to handle Event Title
// and Event Location.

// Required Args: start (number), end (number)
// Optional Args: eventTitle (string), eventLocation (string)

// Example: [{ start: 90, end: 180 }, {start: 120, end: 150}]
// Or: [{ start: 120, end: 240, eventTitle: "Brunch", eventLocation: "The Diner" }]

var layOutDay = function (events) {

	// Clear current calendar of events
	document.getElementById('col-2').innerHTML = '';

	// Sort events by start time
	events.sort(function (a, b) {
		if (a.start < b.start) {
			return -1;
		}
		if (a.start > b.start) {
			return 1;
		}
		return 0;
	});

	// Store number of columns for horizontal placement
	var numCols = 0;

	// Store overlapping columns in a row, place each row in rows
	var row = {
		end: 0,
		columns: []
	};
	var rows = [];

	// iterate through events to each into the proper row
	events.forEach(function (event) {
		if (event.hasOwnProperty('start') && event.hasOwnProperty('end')) {

			// if the event's start time is greater than the last row's
			// end time, or if there are no rows, create a new row with
			// the current event as its only entry, and reset the number
			// of columns back to 0
			if (event.start >= row.end || rows.length === 0) {
				row = {
					end: event.end,
					columns: []
				};
				rows.push(row);
				numCols = 0;
			}

			// if the event's end is after the last event in the row,
			// set the row's end to the event's end
			if (event.end > row.end) {
				row.end = event.end;
			}

			// check to see if there is a column in the row that has
			// extra room
			var newColumn = true;
			var idx;
			row.columns.forEach(function (columnEnd, index) {
				if (numCols > 0 && event.start >= columnEnd) {
					newColumn = false;
					idx = index;
					return;
				}
			});

			// if we need to create a new column, then create a new column 
			// with the event, set the event's column to the numCols, and 
			// add 1 to numCols. otherwise, change the previously found 
			// column's end time to the event's end time, and set the 
			// event's column to the column index. 
			if (newColumn) {
				row.columns.push(event.end);
				event.column = numCols;
				numCols ++;
			} else {
				row.columns[idx] = event.end;
				event.column = idx;
			}

			// attach the row to the event for calculation of width and
			// left positioning
			event.row = row;
		}
	});

	// set width, left, and top positioning for each event and place the event
	// on the dom. also, if the event happens to have a title or location,
	// add that as well

	var calWidth = 600;
	events.forEach(function (event) {
		if (event.hasOwnProperty('start') && event.hasOwnProperty('end')) {
			var template = document.getElementById('event-template').innerHTML;
			if (event.hasOwnProperty('title')) {
				template = template.replace('Event Title', event.title);
			}
			if (event.hasOwnProperty('location')) {
				template = template.replace('Event Location', event.location);
			}

			var el = document.createElement('DIV');
			
			if (el.classList) {
  			el.classList.add('event');
			} else {
  			el.className += ' ' + 'event';
			}

			el.style.height = String(event.end - event.start - 2) + 'px';
			el.style.width = String((calWidth / event.row.columns.length) - 6) + 'px';
			el.style.left = String((calWidth / event.row.columns.length) * event.column + 10) + 'px';
			el.style.top = String(event.start) + 'px';
			el.innerHTML = template;

			document.getElementById('col-2').appendChild(el);
		}
	});
}