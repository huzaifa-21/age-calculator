// selectors 
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let submit = document.getElementById("submit");
let form = document.querySelector("form");
let inputs = document.querySelectorAll("input[type='text']");

// calculated values
let years = document.querySelector(".years");
let months = document.querySelector(".months");
let dayes = document.querySelector(".dayes");

// set the current date
let dateNow = new Date();

inputs.forEach((input) => { input.oninput = () => { input.className = ''; }; });

form.onsubmit = (e) => {
  let validDay = false,
    validMonth = false,
    validYear = false;

  if (day.value > 0 && day.value < 32) {
    validDay = true;
  } else if (!day.value) {
    day.classList.add("required");
  } else {
    day.classList.add('not-valid');
  }

  if (month.value > 0 && month.value < 13) {
    validMonth = true;
  } else if (!month.value) {
    month.classList.add("required");
  } else {
    month.classList.add('not-valid');
  }

  if (year.value > 0 && year.value <= dateNow.getFullYear() && year.value.length == 4) {
    validYear = true;
  } else if (!year.value) {
    year.classList.add("required");
  } else if (year.value.length < 4) {
    year.classList.add('not-valid');
  } else {
    year.classList.add('past-show');
  }

  if (!validDay || !validMonth || !validYear) {
    e.preventDefault();
  } else {
    calcBirth(year.value, month.value, day.value);
    e.preventDefault();
    setTimeout(() => {
      location.reload();
    }, 5000);
  }

  // inputs.forEach((input) => { if (!input.value) input.classList.add("required"); });
};

function calcBirth(year, month, day) {
  let dateNow = new Date();
  let birthDay = new Date(`${year} ${month} ${day}`);

  let yearsValue = dateNow.getFullYear() - birthDay.getFullYear();
  let monthsValue = Math.round(dateNow.getUTCMonth() - birthDay.getUTCMonth());
  let daysValue = dateNow.getDate() > birthDay.getDate() ? dateNow.getDate() - birthDay.getDate() : birthDay.getDate() - dateNow.getDate();

  years.innerHTML = yearsValue > 10 ? parseInt(yearsValue) : `0${yearsValue}`;
  months.innerHTML = monthsValue > 10 ? parseInt(monthsValue) : `0${monthsValue}`;
  dayes.innerHTML = daysValue > 10 ? parseInt(daysValue) : `0${Math.round(daysValue)}`;

  // check if the given date is valid 

};

