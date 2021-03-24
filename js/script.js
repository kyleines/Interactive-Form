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
activities.addEventListener("change", (e) => {
    const clicked = e.target;
    const checkedCost = clicked.getAttribute("data-cost");
    let newTotal = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            newTotal += parseInt(checkboxes[i].getAttribute("data-cost"));
        }
    }
    totalCost.textContent = `Total: $${newTotal}`;
});


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