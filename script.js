
const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const search = document.getElementById("search");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function displayStudents() {
    list.innerHTML = "";

    students.forEach((student, index) => {
        if (
            !(
                student.name.toLowerCase().includes(search.value.toLowerCase()) ||
                student.roll.toLowerCase().includes(search.value.toLowerCase()) ||
                student.course.toLowerCase().includes(search.value.toLowerCase())
            )
        ) return;

        const row = document.createElement("tr");

        [student.name, student.roll, student.course].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const action = document.createElement("td");

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "edit";
        edit.onclick = () => {
            document.getElementById("name").value = student.name;
            document.getElementById("roll").value = student.roll;
            document.getElementById("course").value = student.course;
            editIndex = index;
        };

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "delete";
        del.onclick = () => {
            students.splice(index, 1);
            saveStudents();
        };

        action.append(edit, del);
        row.appendChild(action);
        list.appendChild(row);
    });
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    saveStudents();
    form.reset();
});

search.addEventListener("input", displayStudents);

displayStudents();
