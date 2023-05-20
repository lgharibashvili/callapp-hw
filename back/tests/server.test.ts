import request from "supertest"
import { Customer } from "../src/dataStore"
import { app } from "../src/server"


describe("Customers", () => {
    test("GET request should return data", () => {
        return request(app)
            .get("/customers")
            .expect(200)
            .expect(({body}) => expect(body.success).toBe(true))
            .expect(({body}) => expect(body.data[0]?.email).toBe("melvarogers@gology.com"))
    }),
    test("POST request with existing customer should update it", () => {
        return request(app)
            .post("/customers")
            .send({id: 2, email: "melvarogers@geology.com"})
            .set('Accept', 'application/json')
            .expect(200)
            .expect(({body}) => expect(body.error).toBeUndefined())
            .expect(({body}) => expect(body.success).toBe(true))
            .expect(({body}) => expect(body.data.email).toBe("melvarogers@geology.com"))
            .then(() => request(app)
                .get("/customers")
                .expect(200)
                .expect(({body}) => expect(body.success).toBe(true))
                .expect(({body}) => expect(body.data[0]?.email).toBe("melvarogers@geology.com")))
    })
    test("POST request with new customer should create it", () => {
        return request(app)
            .post("/customers")
            .send({
                id: 90,
                name: "John Bonham",
                email: "johnbonham@youshook.me"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect(({body}) => expect(body.error).toBeUndefined())
            .expect(({body}) => expect(body.success).toBe(true))
            .expect(({body}) => expect(body.data.email).toBe("johnbonham@youshook.me"))
            .then(() => request(app)
                .get("/customers")
                .expect(200)
                .expect(({body}) => expect(body.success).toBe(true))
                .expect(({body}) => expect(body.data.find((el: Customer) => el.id == 90)?.email).toBe("johnbonham@youshook.me")))
    })
    test("DELETE request should remove customer", () => {
        return request(app)
            .delete(`/customers/${2}`)
            .expect(200)
            .expect(({body}) => expect(body.error).toBeUndefined())
            .expect(({body}) => expect(body.success).toBe(true)) 
            .then(() => request(app)
                .get("/customers")
                .expect(200)
                .expect(({body}) => expect(body.error).toBeUndefined())
                .expect(({body}) => expect(body.success).toBe(true))
                .expect(({body}) => expect(body.data.find((el: Customer) => el.id == 2)).toBeUndefined()))
    })
})