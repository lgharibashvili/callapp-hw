import { Customer } from "@/client/types";
import { filterEntries, mapEntries } from "@/utils";
import { useEffect } from "react";
import useCustomerStore from "./useCustomerStore";

type Obj<T> = { [id: string]: T }

type CustomerState = Customer & { pending: boolean }

function integrate(customer: Customer, update?: Customer) {
    return {...customer, ...update, pending: !!update}
}

function mergeUpdates(
        state: Obj<Customer>, updates: Obj<Customer>, removals: Set<number>): Obj<CustomerState> {
    const filtered = filterEntries(state, ([_id, customer]) => !removals.has(customer.id))
    return mapEntries(filtered, ([id, customer]) => [id, integrate(customer, updates[id])])
}

export default function useCustomers() {
    const { fetch, customers, pendingUpdates, pendingRemovals, ...rest } = useCustomerStore()

    useEffect(() => {
        fetch()
    }, [fetch])


    return {
        customers: mergeUpdates(customers, pendingUpdates, pendingRemovals),
        ...rest,
    }
}