import express from "express";

const app = express()
const PORT = 5001

app.get('/', (req, res) => {
    res.send({success: true})
})

try {
    app.listen(PORT, (err) => {
        if(err) {
            return (console.error('Server crashed'))
        }
    })
} catch (e) {
    console.error(e)
}