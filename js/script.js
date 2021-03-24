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