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
    document.querySelector("#name").value = "";
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
    for (c in conditionsCount) {
        report.innerHTML += `<p>${c}: ${conditionsCount[c]}</p>`;
    }
    report.innerHTML += `<br><p>Gender-based conditions breakdown</p>`;
    for (g in genderConditionsCount) {
        report.innerHTML += `<p>${g}</p>`;
        for (c in genderConditionsCount[g]) {
            report.innerHTML += `<p>&nbsp;&nbsp;${c}: ${genderConditionsCount[g][c]}</p>`;
        }
    }
}

addPatientButton.addEventListener("click", addPatient);

function searchCondition() {
    const input = document.querySelector("#conditionInput").value.toLowerCase();
    const resultDiv = document.querySelector("#result");

    resultDiv.innerHTML = "";

    fetch("./health_analysis.json")
        .then(response => response.json())
        .then(data => {
            const condition = data.conditions.find(item => item.name.toLowerCase() === input);
            if (condition) {
                resultDiv.innerHTML = `<h3>${condition.name}</h3><br>`;
                resultDiv.innerHTML += `<img src="${condition.imagesrc}"><br>`;
                resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${condition.symptoms.join(', ')}</p><br>`;
                resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${condition.prevention.join(', ')}</p><br>`;
                resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${condition.treatment}</p>`;
            } else {
                resultDiv.innerHTML = "<p>Condition not found</p>";
            }
        })
        .catch(error => {
            console.error("Error in retriving data", error);
            resultDiv.innerHTML = "<p>Error occured while fetching data</p>";
        });
}

btnSearch.addEventListener("click", searchCondition);