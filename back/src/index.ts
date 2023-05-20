import { app } from "./server"

const port = 4000

app.listen(port, () => {
    console.log(`started backend server on http://localhost:${port}`)
})