import express from "express";
import DBQueries from "./DB/DBQueries.js";

const app = express()
const router = express.Router()
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Expose-Headers', 'Content-Disposition')
    next()
}
app.use(allowCrossDomain)
const PORT = process.env.PORT || 5001

router.get('/save_card', (req, res) => {
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