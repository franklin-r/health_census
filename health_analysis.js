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

function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
        "Thyroid": 0,
        "Diabetes": 0,
        "High Blood Pressure": 0
    };
    const genderConditionsCount = {
        "Male": {
            "Thyroid": 0,
            "Diabetes": 0,
            "High Blood Pressure": 0
        },
        "Female": {
            "Thyroid": 0,
            "Diabetes": 0,
            "High Blood Pressure": 0
        }
    };

    patients.forEach(p => {
        conditionsCount[p.condition] += 1;
        genderConditionsCount[p.gender][p.condition] += 1;
    });

    report.innerHTML = `<p>Number of patients: ${numPatients}</p><br>`;
    report.innerHTML += `<p>Conditions Breakdown</p>`;
    conditionsCount.forEach(c => {
        report.innerHTML += `<p>${c}: ${conditionsCount[c]}</p>`;
    });
    report.innerHTML += `<br><p>Gender-based conditions breakdown</p>`;
    genderConditionsCount.forEach(g => {
        report.innerHTML += `<p>${g}</p>`;
        genderConditionsCount[g].forEach(c => {
            report.innerHTML += `<p>&nbsp;&nbsp;${c}: ${genderConditionsCount[g][c]}</p>`;
        });
    });
}