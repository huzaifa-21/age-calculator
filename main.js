let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let form = document.querySelector("form");
let inputs = document.querySelectorAll("container > input[type='text']");
let nameInput = document.querySelector("#name");
let user = document.querySelector(".name-value");

// calculated values
let years = document.querySelector(".years");
let months = document.querySelector(".months");
let days = document.querySelector(".days");

day.oninput = (e) => {
  e.target.className = "";
};
month.oninput = (e) => {
  e.target.className = "";
};
year.oninput = (e) => {
  e.target.className = "";
};

// set the current date
let dateNow = new Date();

inputs.forEach((input) => {
  input.oninput = () => {
    input.className = "";
  };
});

form.onsubmit = (e) => {
  e.preventDefault();
  let validDay = false,
    validMonth = false,
    validYear = false;

  if (day.value > 0 && day.value < 32) {
    validDay = true;
  } else if (!day.value) {
    day.classList.add("required");
  } else {
    day.classList.add("not-valid");
  }

  if (month.value > 0 && month.value < 13) {
    validMonth = true;
  } else if (!month.value) {
    month.classList.add("required");
  } else {
    month.classList.add("not-valid");
  }

  if (
    year.value > 0 &&
    year.value <= dateNow.getFullYear() &&
    year.value.length == 4
  ) {
    validYear = true;
  } else if (!year.value) {
    year.classList.add("required");
  } else if (year.value.length < 4) {
    year.classList.add("not-valid");
  } else {
    year.classList.add("past-show");
  }

  if (validDay && validMonth && validYear) {
    calcBirth(year.value, month.value, day.value);
  }
};

function animateValue(element, start, end, duration) {
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let progress = currentTime - startTime;
    let val = Math.floor(start + (end - start) * (progress / duration));
    element.textContent = val > 9 ? val : `0${val}`;
    if (progress < duration) {
      requestAnimationFrame(animation);
    } else {
      element.textContent = end > 9 ? end : `0${end}`;
    }
  }

  requestAnimationFrame(animation);
}

function calcBirth(year, month, day) {
  user.innerHTML = `<span>${nameInput.value}</span> عمرك:`;

  let dateNow = new Date();
  let birthDate = new Date(year, month - 1, day);

  let yearsValue = dateNow.getFullYear() - birthDate.getFullYear();
  let monthsValue = dateNow.getMonth() - birthDate.getMonth();
  let daysValue = dateNow.getDate() - birthDate.getDate();

  if (monthsValue < 0 || (monthsValue === 0 && daysValue < 0)) {
    yearsValue--;
    monthsValue += 12;
  }

  if (daysValue < 0) {
    monthsValue--;
    let prevMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 0);
    daysValue += prevMonth.getDate();
  }

  animateValue(years, 0, yearsValue, 1000);
  animateValue(months, 0, monthsValue, 1000);
  animateValue(days, 0, daysValue, 1000);
}
