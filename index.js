function fetchAndRender() {
    fetch('students.json')
        .then(response => response.json()
            .then(data => {
                var students = data.students;
                console.log(students);
                for (var student of students) {
                    console.log(student.rollno)
                    let s = document.getElementById('studentsList');
                    var row = `<tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.course}</td>
                        <td><button onclick="editData(${student.id})">Edit</button>&nbsp&nbsp<button onclick="deleteData(${student.id})">Delete</button></td>
                    </tr>`
                    s.innerHTML += row
                }
                // students.forEach(student => {
                //     console.log(student.rollno)
                //     let s = document.getElementById('studentsList');
                //     var row = `<tr>
                //         <td>${student.rollno}</td>
                //         <td>${student.name}</td>
                //         <td>${student.course}</td>
                //         <td><button>Edit</button>&nbsp&nbsp<button>Delete</button></td>
                //     </tr>`
                //     s.innerHTML += row
                // })
            }
            ))
}
// console.log("index.js")
document.getElementById('addStd').addEventListener("click", (e) => {
    e.preventDefault()
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var course = document.getElementById('course').value;

    var data = {
        id, name, course
    }
    // fetch('http://localhost:3000/students')
    //     .then(response => response.json()
    //         .then(data => {
    //             var students = data;
    //             console.log(students);
    //         }
    //         )
    //     )

    fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

})

function editData(id1) {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var course = document.getElementById('course').value;

    var data = {
        id, name, course
    }
    fetch("http://localhost:3000/students/" + id1, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

function deleteData(id1) {
    fetch("http://localhost:3000/students/" + id1, { method: 'DELETE' })
    console.log(id1)
}

window.onload = fetchAndRender;
