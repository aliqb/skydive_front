export function sortDate<T>(data:T[],dateField:keyof T):T[]{
    return data.sort((first,second)=>{
        const firstArr = (first[dateField] as string).split('/');
        const secondArr = (second[dateField] as string).split('/');
        const yearsDiff = +firstArr[0] - +secondArr[0];
        if(yearsDiff !==0){
            return yearsDiff
        }
        const monthDiff = +firstArr[1] - +secondArr[1];
        if(monthDiff !==0){
            return monthDiff
        }
        return +firstArr[2] - +secondArr[2]
    })
}