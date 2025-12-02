export const formatDate = (dateStr: string | undefined) => {
    if(!dateStr) return '';
    const [year, month, day] = dateStr.split('-')
    return `${day}.${month}.${year}`
}