import express from "express";
import DBQueries from "./DB/DBQueries.js";

const app = express()
const PORT = process.env.PORT || 5001

app.get('/save_card', (req, res) => {
    const info = req.query
    const now = new Date()
    const normalize = (time) => {
        return time.toString().length===2?time:('0'+time)
    }
    info.priority = /_+(?<weight>\d)$/.exec(info.priority).groups["weight"]

    info.creationDate = `${now.getFullYear()}.${normalize(now.getMonth())}.${normalize(now.getDate())} ${normalize(now.getHours())}:${normalize(now.getMinutes())}`
    // DBQueries.addColsInTable('default','task',['title','priority','tags','description','creationDate'],)
    DBQueries.addElementsInTable(
        'default', 
        'task', 
        ['title','priority','tags','description','creationDate'],
        [info.title, info.priority, info.tags, info.description, info.creationDate]
    )

    console.log(info)
    res.send({success: true})
})

try {
    app.listen(PORT, (err) => {
        if(err) {
            return (console.error('Server crashed'))
        }
        console.log('server works on port '+PORT)
    })
} catch (e) {
    console.error(e)
}