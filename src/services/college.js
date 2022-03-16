import _ from "lodash";

//Data processor
export default class College{
    #courseData;
    #courses;
    constructor(courses, courseData){
        this.#courses = courses;
        this.#courseData = courseData;
    }
    async addCourse(course){
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
            return await this.#courses.add(course);
        }
        return validationMessage;
    }
    #getValidationMessage(course){
        //TODO 
        //validate course
        let message;
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
    async getAllCourses(){
        return await this.#courses.get();
    }
    async sortCourses(key){
        return _.sortBy(await this.getAllCourses(), key);
        
    }
    async #getStatistics(interval, field){
        const courses = await this.getAllCourses();
        const objStat = _.countBy(courses, e => {
            return Math.floor(e[field/interval]);
        });
        return Object.keys(objStat).map(s => {
            return {minInterval: s * interval + interval -1,
            amount: objStat[s]}
        });
    }
    getHoursStatistics(lengthInterval){
        return  this.#getStatistics(lengthInterval, 'hours');
        
    }
    getCostStatistic(lengthInterval){
        return this.#getStatistics(lengthInterval, 'cost');
    }
    async removeCourse(id){
        if(! await this.#courses.exists(id)){
            throw `course with id ${id} not found`
        }
        return this.#courses.remove(id);
    }
}