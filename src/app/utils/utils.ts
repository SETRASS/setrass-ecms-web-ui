export function getYearSelect(startDate: string, endDate: string){
    let start = new Date(startDate).getFullYear();
    let end = new Date(endDate).getFullYear();
    const anio2015 = new Date('2015-01-1').getFullYear();
    let years: string[] = [];
    if(start >= anio2015){
        for(let year = start; year <= end; year++){
            years.push(year+'');
        }
    }else{
        for(let year = anio2015; year <= end; year++){
            years.push(year+'');
        }
    }
    return years;
}