import { createCourse } from "../models/course";
import { getRandomNumber, getRandomElement, getRandomDate } from "./random";
//import courseData from './config/courseData.json'
export function getRandonCourse(courseData){
    //TODO
    //getting random arguments for the below function call
    let id = getRandomNumber(courseData['minId'], courseData['maxId']);
    let name = getRandomElement(courseData['courses']);
    let lecturer = getRandomElement(courseData['lectors']);
    let hours = Math.round(getRandomNumber(courseData['minHours'],courseData['maxHours'])/10)*10;
    let cost = Math.round(getRandomNumber(courseData['minCost'], courseData['maxCost'])/100)*100;
    let openingDate = getRandomDate(courseData['minYear'], courseData['maxYear']);

    return createCourse(id, name,lecturer, hours, cost ,openingDate);
}