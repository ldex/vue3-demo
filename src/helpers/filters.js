export function toCurrency(value) {
    return `$${value.toFixed(2)}`
}

export function toUppercase(value) {
    return value.toUpperCase();
}

export function toDate(value) {
    var d  = new Date(value);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${day}-${month}-${year}`;
}  