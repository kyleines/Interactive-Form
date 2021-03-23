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
