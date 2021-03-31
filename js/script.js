/************************************************
Treehouse FSJS Techdegree:
Project 3 - Interactive Form
************************************************/



/*
Dear Reviewer,
I appreciate you for taking the time to review my project! 
Your feedback is important to me and crucial to my growth as a developer.
With the following code I hope to earn the "Exceeds Expectations" grade, and 
I humbly request that you reject my submission if I don't meet those requirements.

Thank you again!
-Kyle
*/



/***
 * 
 * BASIC INFO SECTION
 * 
***/

// Name field auto focus on page load
document.querySelector("#name").focus();

// Helper functions for Name & Email validation
const nameField = document.querySelector("#name");
const nameValidity = () => {
    const nameInput = nameField.value;
    const nameIsValid = /^[A-Za-z]+\s?[A-Za-z]*?\s?[A-Za-z]*?$/.test(nameInput);
    return nameIsValid;
}
const emailField = document.querySelector("#email");
const emailValidity = () => {
    const emailInput = emailField.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput);
    return emailIsValid;
}

// Displays/hides "other job role" text field when "Other" 
// is selected from Job Role dropdown list
const otherJob = document.querySelector("#other-job-role");
const jobTitle = document.querySelector("#title");
otherJob.style.display = "none";
jobTitle.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJob.style.display = "";
    } else {
        otherJob.style.display = "none";
    }
});


/***
 * 
 * T-SHIRT INFO SECTION
 * 
***/

// Enables the corresponding shirt color options to be 
// selected once a shirt theme has been selected
const shirtDesign = document.querySelector("#design");
const shirtColor = document.querySelector("#color");
shirtColor.disabled = true;
shirtDesign.addEventListener("change", (e) => {
    shirtColor.disabled = false;
    for (let option of shirtColor.options) {
        option.hidden = true;
        if (option.getAttribute("data-theme") === e.target.value) {
            option.hidden = false;
            if (option.value === "cornflowerblue" || option.value === "tomato") {
                option.selected = true;
            }
        }
    }
});


/*** 
 * 
 * ACTIVITIES SECTION
 * 
***/

// Updates 'Total Cost' based on selected activities
// Also disables classes with conflicting class times
const activities = document.querySelector("#activities");
const checkboxes = document.querySelectorAll("#activities input");
const totalCost = document.querySelector("#activities-cost");
let newTotal = 0;
activities.addEventListener("change", (e) => {
    if (e.target.checked) {
        newTotal += parseInt(e.target.getAttribute("data-cost"));
    } else {
        newTotal -= parseInt(e.target.getAttribute("data-cost"));
    }
    totalCost.innerHTML = `Total: $${newTotal}`;
    for (let i = 0; i < checkboxes.length; i++) {
        if (e.target.getAttribute("data-day-and-time") === 
        checkboxes[i].getAttribute("data-day-and-time") && e.target !== checkboxes[i]) {
            if (e.target.checked) {
                checkboxes[i].disabled = true;
                checkboxes[i].parentElement.className = "disabled";
            } else {
                checkboxes[i].disabled = false;
                checkboxes[i].parentElement.className = "";
            }
        }
    }
});

// Adds better visability to the activity in focus
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("focus", (e) => {
        e.target.parentElement.className += " focus";
    });
    checkboxes[i].addEventListener("blur", (e) => {
        e.target.parentElement.className += "blur";
    });
}

// Helper function for Activities validation
const activitiesValidity = () => {
    const activitiesIsValid = newTotal > 0;
    return activitiesIsValid;
}


/***
 * 
 * PAYMENT INFO SECTION
 * 
***/

// Displays/hides relevant payment information based on payment type selected
const paymentType = document.querySelector("#payment");
paymentType.options[1].selected = true;
document.querySelector("#paypal").hidden = true;
document.querySelector("#bitcoin").hidden = true;
paymentType.addEventListener("change", (e) => {
    for (let option of paymentType.options) {
        if (option.selected) {
            document.querySelector(`#${option.value}`).hidden = false;
        } else if (!option.selected && option.value !== "select method") {
            document.querySelector(`#${option.value}`).hidden = true;
        }
        
    }
});

// Helper functions for the Credit-Card payment type validation
const cardNumberField = document.querySelector("#cc-num");
const cardNumberValidity = () => {
    const cardNumberInput = cardNumberField.value;
    const cardNumberIsValid = /^\d{13}\d?\d?\d?$/.test(cardNumberInput);
    return cardNumberIsValid;
}
const zipField = document.querySelector("#zip");
const zipValidity = () => {
    const zipInput = zipField.value;
    const zipIsValid = /^\d{5}$/.test(zipInput);
    return zipIsValid;
}
const cvvField = document.querySelector("#cvv");
const cvvValidity = () => {
    const cvvInput = cvvField.value;
    const cvvIsValid = /^\d{3}$/.test(cvvInput);
    return cvvIsValid;
}

// Validates CVV field on keyup
cvvField.addEventListener("keyup", (e) => {
    fieldValidation(cvvValidity(), e, cvvField, "cvv-hint");
});


/*** 
 * 
 * SUBMIT EVENT SECTION
 * 
***/

// "Submits" form (refreshes page) when all required inputs are valid
document.querySelector("form").addEventListener("submit", (e) => {
    // Name
    fieldValidation(nameValidity(), e, nameField, "name-hint");

    // Email
    if (!emailValidity()) {
        e.preventDefault();
        if (emailField.value === "") {
            emailField.parentElement.className = "not-valid";
            emailField.parentElement.lastElementChild.className = "email-hint";
            emailField.parentElement.lastElementChild.innerHTML = `Email field cannot be blank`;
        } else {
            emailField.parentElement.className = "not-valid";
            emailField.parentElement.lastElementChild.className = "email-hint";
            emailField.parentElement.lastElementChild.innerHTML = `Email address must be formatted correctly`;
        }
    } else {
        emailField.parentElement.className = "valid";
        emailField.parentElement.lastElementChild.className = "email-hint hint";
    }

    // Activities
    if (!activitiesValidity()) {
        e.preventDefault();
        activities.className = "activities not-valid";
        activities.lastElementChild.className = "activities-hint";
    } else {
        activities.className = "activities valid";
        activities.lastElementChild.className = "activities-hint hint";
    }

    // Credit-Card
    if (paymentType.value === "credit-card") {
        fieldValidation(cardNumberValidity(), e, cardNumberField, "cc-hint")
        fieldValidation(zipValidity(), e, zipField, "zip-hint");
        fieldValidation(cvvValidity(), e, cvvField, "cvv-hint");
    }
});

// Helper function for refactoring and readability
function fieldValidation(functionName, e, fieldName, classString) {
    if (!functionName) {
        e.preventDefault();
        fieldName.parentElement.className = "not-valid";
        fieldName.parentElement.lastElementChild.className = classString;
    } else {
        fieldName.parentElement.className = "valid";
        fieldName.parentElement.lastElementChild.className = `${classString} hint`;
    }
};