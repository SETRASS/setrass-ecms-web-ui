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

export function setDataSalaryCalculationStore(data: object) {
    localStorage.setItem('salary-calculation',JSON.stringify(data));
}

export function getDataStore(item: string) {
    return JSON.parse(localStorage.getItem(item)!);
}

export function setDataCacheStore(data: object) {
    localStorage.setItem('cache',JSON.stringify(data));
}

export function setDataGender(data: string) {
    localStorage.setItem('gender',data);
}

export function getDataGender() {
    localStorage.getItem('gender');
}

export function clearCacheData(){
    localStorage.removeItem('cache');
}

export function clearSalaryCalculationData(){
    localStorage.removeItem('salary-calculation');
}