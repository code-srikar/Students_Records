const fs = require('fs')
const students = require('./students.json')

let data = [
    {
        "rollno": 1,
        "name": "Srikar",
        "course": "CSE"
    }
]

const http = require('http');
const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.write("Hello!")
        res.end()
    } else if (req.url === '/students') {
        res.write(JSON.stringify(students))
        res.end()
    } else if (req.url === '/home') {
        fs.readFile(__dirname + "/index.html", "utf-8", (err, htmldata) => {
            if (err) {
                res.write("Unable to process");
                res.end()
            } else {
                fs.readFile(__dirname + "/index.css", "utf-8", (err, cssdata) => {
                    if (!err) {
                        fs.readFile(__dirname + "/index.js", "utf-8", (err, jsdata) => {
                            if (!err) {
                                res.write(`
                                    <style>${cssdata}</style>
                                    ${htmldata}
                                    <script>${jsdata}</script>
                                `)
                                res.end()
                            }
                            else {
                                res.write("Unable tom process")
                                res.end()
                            }
                        })
                    } else {
                        res.write("Unable to process");
                        res.end()
                    }
                })
                // res.writeHead(200, { 'Content-Type': 'text/html' })
                // res.write(htmldata);
                // res.end();
            }
        })
    }
})
server.listen(3000)
console.log("Server is running at 3000")