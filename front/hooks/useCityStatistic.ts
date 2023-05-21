import useCustomers from "./useCustomers"

function groupBy<T,K>(items: T[], by: (item: T) => K): Map<K, T[]> {
    const keys = new Set(items.map(item => by(item)))
    return new Map(Array.from(keys).map(key => [key, items.filter(item => by(item) === key)] as [K, T[]]))
}

export default function useCityStatistic() {
    const { customers } = useCustomers()

    const cityGroups = groupBy(Object.values(customers), customer => customer.address.city)
    return Array.from(
        cityGroups.entries()).map(([city, customers]) => ({city, count: customers.length}))
}