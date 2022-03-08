//Data processor
export default class College{
    #courseData;
    #courses;
    constructor(courses, courseData){
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course){
        //TODO 
        //validation of the course data
        //if course is valid, then course should be added : this.#courses.add(course)
        //if course is invalid, then the method returns full message describing that's wrong
        //converting form from strings to the proper
        
        //course.hours = +course.hourse;
        //course.cost = +course.cost;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage){
            return this.#courses.add(course);
        }
        return validationMessage;
    }
    #getValidationMessage(course){
        //TODO 
        //validate course
        let message;
        //const message = document.getElementById("test");
        //message.innerHTML = `<div> ${this.#courseData["minCost"]} </div>`
        //message.innerHTML = `<div> ${course["cost"]} </div>` 
        //message.innerHTML = `<div> ${course["openingDate"]} </div>` 

        if(!(this.#courseData["courses"]).includes(course["name"])){
            message += `Course does not exist <br>`;
        }
        if(!(this.#courseData["lectors"]).includes(course["lecturer"])){
            message += `Lector does not exist <br>`;
        }
        if(course["hours"] < this.#courseData["minHours"] || course["hours"] > this.#courseData["maxHours"]){
            message += `Hours should be from 80 to 500 <br>`;
        }
        if(course["cost"] < this.#courseData["minCost"] || course["cost"] > this.#courseData["maxCost"]){
            message += `Cost should be from 6000 to 30000 <br>`;
        }
        //if(course["openingDate"] < new Date(this.#courseData["minYear"], 1, 1) || course["openingDate"] > new Date(this.#courseData["maxYear"], 1, 1)){
            if(course["openingDate.getFullYear()"] < this.#courseData["minYear"] || course["openingDate.getFullYear()"] > this.#courseData["maxYear"]){
            message += `Date should be from 2000 to 2022 <br>`;
        }
        
        return message;
    }
}