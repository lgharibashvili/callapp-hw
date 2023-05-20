import express from 'express'
import cors from 'cors'
import { readFile } from 'fs/promises'
import { createStore } from './dataStore'

export const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())

const store = createStore('./data.json')

app.get('/customers', async (_req, res) => {
    try {
        const data = await store.getCustomers()
        res.json({
            success: true,
            data
        })
    }
    catch(err) {
        res.json({
            success: false,
            error: (err as Error).message
        })
    }
})

app.post('/customers', async (req, res) => {
    try {
        const data = await store.updateCustomer(req.body)
        res.json({
            success: true,
            data
        })
    }
    catch(err) {
        res.json({
            success: false,
            error: (err as Error).message
        })
    }
})

app.delete('/customers/:id', async (req, res) => {
    try {
        await store.removeCustomer(parseInt(req.params.id))
        res.json({
            success: true
        })
    }
    catch(err) {
        res.json({
            success: false,
            error: (err as Error).message
        })
    }
})