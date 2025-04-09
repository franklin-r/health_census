const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatient() {
    const name      = document.querySelector("#name").value;
    const gender    = document.querySelector('input[name="gender"]:checked');
    const age       = document.querySelector("#age").value;
    const condition = document.querySelector("#condition").value;

    if (name && gender && age && condition) {
        patients.push({
            name: name,
            gender: gender.value,
            age: age,
            condition: condition
        });
        resetForm();
        generateReport();
    }
}

function resetForm() {
    document.querySelector("#name").value "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.querySelector("#age").value = "";
    document.querySelector("#condition").value = "";
}