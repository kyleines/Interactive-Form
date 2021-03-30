document.querySelector("#name").focus();

const otherJob = document.querySelector("#other-job-role");
otherJob.style.display = "none";
const jobTitle = document.querySelector("#title");
jobTitle.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJob.style.display = "";
    } else {
        otherJob.style.display = "none";
    }
});


const shirtDesign = document.querySelector("#design");
const shirtColor = document.querySelector("#color");
shirtColor.disabled = true;
shirtDesign.addEventListener("change", (e) => {
    shirtColor.disabled = false;
    for (let i = 0; i < shirtColor.length; i++) {
        shirtColor.options[i].hidden = true;
        if (e.target.value === "js puns") {
            shirtColor.options[1].selected = true;
            shirtColor.options[1].hidden = false;
            shirtColor.options[2].hidden = false;
            shirtColor.options[3].hidden = false;
        } else {
            shirtColor.options[4].selected = true;
            shirtColor.options[4].hidden = false;
            shirtColor.options[5].hidden = false;
            shirtColor.options[6].hidden = false;
        }
    }
});


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
        if (e.target.getAttribute("data-day-and-time") === checkboxes[i].getAttribute("data-day-and-time") && e.target !== checkboxes[i]) {
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
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("focus", (e) => {
        e.target.parentElement.className += " focus";
    });
    checkboxes[i].addEventListener("blur", (e) => {
        e.target.parentElement.className += "blur";
    });
}



const paymentType = document.querySelector("#payment");
paymentType.options[1].selected = true;
document.querySelector("#paypal").hidden = true;
document.querySelector("#bitcoin").hidden = true;
paymentType.addEventListener("change", (e) => {
    if (paymentType.options[1].selected) {
        document.querySelector("#credit-card").hidden = false;
        document.querySelector("#paypal").hidden = true;
        document.querySelector("#bitcoin").hidden = true;
    } else if (paymentType.options[2].selected) {
        document.querySelector("#credit-card").hidden = true;
        document.querySelector("#paypal").hidden = false;
        document.querySelector("#bitcoin").hidden = true;
    } else {
        document.querySelector("#credit-card").hidden = true;
        document.querySelector("#paypal").hidden = true;
        document.querySelector("#bitcoin").hidden = false;
    }
});


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
const activitiesValidity = () => {
    const activitiesIsValid = newTotal > 0;
    return activitiesIsValid;
}
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
cvvField.addEventListener("keyup", (e) => {
    if (!cvvValidity()) {
        e.preventDefault();
        cvvField.parentElement.className = "not-valid";
        cvvField.parentElement.lastElementChild.className = "cvv-hint";
    } else {
        cvvField.parentElement.className = "valid";
        cvvField.parentElement.lastElementChild.className = "cvv-hint hint";
    }
});


document.querySelector("form").addEventListener("submit", (e) => {
    if (!nameValidity()) {
        e.preventDefault();
        nameField.parentElement.className = "not-valid";
        nameField.parentElement.lastElementChild.className = "name-hint";
    } else {
        nameField.parentElement.className = "valid";
        nameField.parentElement.lastElementChild.className = "name-hint hint";
    }
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
    if (!activitiesValidity()) {
        e.preventDefault();
        activities.className = "activities not-valid";
        activities.lastElementChild.className = "activities-hint";
    } else {
        activities.className = "activities valid";
        activities.lastElementChild.className = "activities-hint hint";
    }
    if (paymentType.value === "credit-card") {
        if (!cardNumberValidity()) {
            e.preventDefault();
            cardNumberField.parentElement.className = "not-valid";
            cardNumberField.parentElement.lastElementChild.className = "cc-hint";
        } else {
            cardNumberField.parentElement.className = "valid";
            cardNumberField.parentElement.lastElementChild.className = "cc-hint hint";
        }
        if (!zipValidity()) {
            e.preventDefault();
            zipField.parentElement.className = "not-valid";
            zipField.parentElement.lastElementChild.className = "zip-hint";
        } else {
            zipField.parentElement.className = "valid";
            zipField.parentElement.lastElementChild.className = "zip-hint hint";
        }
        if (!cvvValidity()) {
            e.preventDefault();
            cvvField.parentElement.className = "not-valid";
            cvvField.parentElement.lastElementChild.className = "cvv-hint";
        } else {
            cvvField.parentElement.className = "valid";
            cvvField.parentElement.lastElementChild.className = "cvv-hint hint";
        }
    }
});