async function fetchAndRender() {
    fetch('/students.json')
        .then(response => response.json()
            .then(data => {
                var students = data.students;
                console.log(students);
                for (var student of students) {
                    console.log(student.rollno)
                    let s = document.getElementById('studentsList');
                    var row = `<tr>
                        <td>${student.rollno}</td>
                        <td>${student.name}</td>
                        <td>${student.course}</td>
                        <td><button>Edit</button>&nbsp&nbsp<button>Delete</button></td>
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
console.log("index.js")
document.getElementById('addStd').addEventListener("click", (e) => {
    e.preventDefault()
    var rno = document.getElementById('rno').value;
    var name = document.getElementById('name').value;
    var course = document.getElementById('course').value;

    var data = {
        rno, name, course
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

window.onload = fetchAndRender;
