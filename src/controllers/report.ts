// use those to get the time and date when a report was created 

// get the time and date when the user created the appointment----------------------------------------------------------------------------------

const date_before = new Date().toLocaleDateString().split("/");
const month = date_before[0].padStart(2,'0');
const day =  date_before[1].padStart(2,'0');
const year = date_before[2];
const date = `${year}-${month}-${day}`;

const time = new Date().toTimeString().split(" ")[0];

