import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import { getRandonCourse } from './utils/randomCourse';
const N_COURSES = 5;
function createCourses(){
    const courses = [];
    for(let i = 0; i < N_COURSES; i++){
        courses.push(getRandonCourse(courseData));
    }
    return courses;
}
//TODO
//rendering inside <ul> (Homework-22)
/*
function render(){
    let listItem = document.getElementById("courses");
    let coursesList = createCourses();
    listItem.innerHTML = coursesList.map(i => `
    <li>${JSON.stringify(i)}</li>
    `).join("");
}
render();
*/
//************************* Classwork-23
function getCourseItem(courses){
    return courses.map(c => `<li>${JSON.stringify(c)}</li>`).join('');
}
const ulElem = document.getElementById("courses");
const courses = createCourses();
ulElem.innerHTML = `${getCourseItem(courses)}`;
const dataProvider = new Courses(courses);
const dataProcessor = new College(dataProvider, courseData);
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const message = dataProcessor.addCourse(course);
    if (typeof(message)!=='string'){
    //course.id=100000;
    ulElem.innerHTML += `<li>${JSON.stringify(course)}</li>`;
    return '';
    }
    return message;
    
})