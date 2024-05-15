async function fetchAndRender() {
    fetch('students.json')
        .then(response => response.json()
            .then(data => {
                let students = [data];
                console.log(students);
                students.forEach(student => {
                    console.log(student)
                    let s = document.getElementById('studentsList');
                    var row = `<tr>
                        <td>${student.rollno}</td>
                        <td>${student.name}</td>
                        <td>${student.course}</td>
                    </tr>`
                    s.innerHTML += row
                })
            }
            ))
}

function addStudent() {
}

document.getElementById('addStd').addEventListener("click", addStudent)

window.onload = fetchAndRender;
