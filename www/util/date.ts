export function getIsoYyyyMmDdString(date: Date): string {
    return date.toISOString().split('T')[0];
}
