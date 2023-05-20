import { create } from "zustand"
import getCustomers from "../client/getCustomers"
import { Customer } from "@/client/types"
import updateCustomer from "@/client/updateCustomer"
import deleteCustomer from "@/client/deleteCustomer"

export type Customers = { [id: string]: Customer }

interface Store {
    customers: Customers
    pendingUpdates: Customers
    pendingRemovals: Set<number>
    remove: (customer: Customer) => void
    update: (customer: Customer) => void
    fetch: () => void
}

function omit(obj: any, key: any) {
    const {[key]: _, ...rest} = obj
    return rest
}

function setOmit<T>(set: Set<T>, key: T) {
    const nextState = new Set(set)
    nextState.delete(key)
    return nextState
}

export default create<Store>(set => ({
    customers: {},
    pendingUpdates: {},
    pendingRemovals: new Set(),
    fetch: async () => {
        const customersList = await getCustomers()
        const customers = Object.fromEntries(customersList.map(customer => [customer.id, customer] as [number, Customer]))
        set({customers})
    },
    update: async customer => {
        // add update to pendingUpdates which will optimistically update the UI
        set(({pendingUpdates}) => 
            ({ pendingUpdates: {...pendingUpdates, [customer.id]: customer }})
        )
        // send update to server
        try {
            const res = await updateCustomer(customer)
            console.log('Succesfully updated customer', res)
            // turn pendingUpdate into actual update
            set(({pendingUpdates, customers}) => 
                ({ 
                    pendingUpdates: omit(pendingUpdates, customer.id),
                    customers: {...customers, [res.id]: res}
                })
            )
        } catch (error) {
            // in case of error, remove pendingUpdate and log error
            // in actual app, we would probably want to show an error message to the user
            // and provide a way to retry the update
            set(({pendingUpdates}) => 
                ({ 
                    pendingUpdates: omit(pendingUpdates, customer.id),
                })
            )
            console.error(new Error('Failed to update customer', {cause: error as Error}))
        }
    },
    remove: async customer => {
        // add customer id to pendingRemovals which will optimistically update the UI
        set(({pendingRemovals}) => 
            ({ pendingRemovals: new Set([...Array.from(pendingRemovals), customer.id]) })
        )
        // send update to server
        try {
            await deleteCustomer(customer.id)
            console.log('Succesfully removed customer', customer)
            // turn pendingRemoval into actual removal
            set(({pendingRemovals, customers}) => 
                ({ 
                    pendingRemovals: setOmit(pendingRemovals, customer.id),
                    customers: omit(customers, customer.id)
                })
            )
        } catch (error) {
            // in case of error, remove pendingRemoval and log error
            // in actual app, we would probably want to show an error message to the user
            // and provide a way to retry removal
            set(({pendingRemovals}) => 
                ({ 
                    pendingRemovals: setOmit(pendingRemovals, customer.id),
                })
            )
            console.error(new Error('Failed to remove customer', {cause: error as Error}))
        }
    }
}))
