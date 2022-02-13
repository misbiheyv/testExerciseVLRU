import express from "express";
import DBQueries from "./DB/DBQueries.js";

const app = express()
const router = express.Router()
router.use(express.urlencoded({ extended: true }))

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Expose-Headers', 'Content-Disposition')
    next()
}
app.use(allowCrossDomain)
app.use(router)
const PORT = process.env.PORT || 5001

router.get('/save_card', (req, res) => {
    const info = req.query
    const now = new Date()
    const normalize = (time) => {
        return time.toString().length===2?time:('0'+time)
    }
    info.priority = /_+(?<weight>\d)$/.exec(info.priority)?.groups?.weight ?? '1'

    info.creationDate = `${now.getFullYear()}.${normalize(now.getMonth())}.${normalize(now.getDate())} ${normalize(now.getHours())}:${normalize(now.getMinutes())}`
    // DBQueries.addColsInTable('default','task',['title','priority','tags','description','creationDate'],)
    DBQueries.addElementsInTable(
        'default', 
        'task', 
        ['title','priority','tags','description','creationDate'],
        [info.title, info.priority, info.tags, info.description, info.creationDate]
    )

    res.send({success: true, info})
})

router.get('/get_cards/:section/:range/', (req, res) => {
    const section = Number(req.params.section)
    const range = Number(req.params.range)

    DBQueries.getRows('default', 'task')
        .then(tasks => {
            if(tasks.length < 1) {
                return res.send({success: false})
            }
            // const slice = tasks.slice(start, start+range).reverse()
            // const slice = tasks.slice(tasks.length-1-start-range, tasks.length-1-start).reverse()
            // const slice2 = tasks.slice(start, start+range).reverse()
            // const slice = tasks.slice(tasks.length+1-section-range, tasks.length+1-section).reverse()
            const slice = tasks.reverse().slice((section-1)*range, section*range)
            console.log(slice)
            // console.log(slice2)
            return res.send({success: true, tasks: slice})
        })
})

router.get('/getTasksCount', async (req, res) => {
    try {
        const r = await DBQueries.getRowsCount('default', 'task')
        res.send({success: true, count: r[0].count})
    } catch(e) {
        res.send({ success: false })
    }
})

router.get('/get_task', async (req, res) => {
    try {
        const r = await DBQueries.getRowById('default', 'task', req.query.id)
        const {id, title, priority, tags, creationDate, description} = r[0]
        res.send({success: true, id, title, priority, tags, creationDate, description})
        
    } catch (e) {
        res.send({ success: false })
        console.error(e)
    }
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