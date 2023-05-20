type Obj<T> = {[key: string]: T}

export function mapEntries<T, TR>(obj: Obj<T>, fn: (entry: [string, T]) => [string, TR]): Obj<TR> {
    return Object.fromEntries(Object.entries(obj).map(fn))
}

export function filterEntries<T>(obj: Obj<T>, fn: (entry: [string, T]) => boolean): Obj<T> {
    return Object.fromEntries(Object.entries(obj).filter(fn))
}

export function toTitleCase(str: string): string {
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}