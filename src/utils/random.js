export function getRandomNumber(min, max){
    //TODO
    //return a random number in the rage[min-max]
    if(min > max) [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min) + min);
}
export function getRandomElement(array){
    //TODO
    //return a random element of array
    return array[Math.floor(Math.random()*array.length)];
}
export function getRandomDate(minYear, maxYear){
    let year = getRandomNumber(minYear, maxYear);
    let month = getRandomNumber(1, 12);
    let day = getRandomNumber(1, 28);
    const date = new Date(year, month, day);
    return date;
    //TODO
    //returns random Date object (see constructor of the standart class)
    //const date = new Date(year, month, day)
}