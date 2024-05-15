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
                        <td><button>Edit</button>&nbsp&nbsp<button>Delete</button></td>
                    </tr>`
                    s.innerHTML += row
                })
            }
            ))
}

document.getElementById('addStd').addEventListener("click", () => {
    var rno = document.getElementById('rno').value;
    var name = document.getElementById('name').value;
    var course = document.getElementById('course').value;

    var data = {
        rno: rno,
        name: name,
        course: course
    }

    fetch('http://localhost:3000/students', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

})

window.onload = fetchAndRender;
