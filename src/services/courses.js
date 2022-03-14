//fake Data provisioning module

import { getRandomNumber } from "../utils/random";

//data are the regular JS array (fake)
export default class Courses{
    #coursesList;
    #minId;
    #maxId;
    constructor(minId, maxId, courses){
        this.#coursesList = courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 10000000;
    }
    add(course){
        course.id = this.#getId();
        this.#coursesList.push(course);
        return course;
    }
    #getId(){
        //return unique value of id
        let id;
        //do{
        id = getRandomNumber(this.#minId, this.#maxId)
        //}while(this.exists(id))
        return id;
    }
    exists(id){
        //TODO
        //checks if a course with the given id exists
        //return this.#coursesList.map(c => c == this.id ? true : false)
        //return false;
        
        return !!this.#coursesList.find(c => c.id === id);
    }
    get(){
        return this.#coursesList;
    }
    remove(id){
        const index = this.#coursesList.findIndex(c => c.id === id);
        const res = this.#coursesList[index];
        this.#coursesList.splice(index, 1);
        return res;
    }
}