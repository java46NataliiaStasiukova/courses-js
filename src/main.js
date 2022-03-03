import courseData from './config/courseData.json'
import { getRandonCourse } from './utils/randomCourse';
const N_COURSES = 10;
function createCourses(){
    const courses = [];
    for(let i = 0; i < N_COURSES; i++){
        courses.push(getRandonCourse(courseData));
    }
    return courses;
}
//TODO
//rendering inside <ul>
function render(){
    let listItem = document.getElementById("courses");
    let coursesList = createCourses();
    listItem.innerHTML = coursesList.map(i => `
    <li>${JSON.stringify(i)}</li>
    `).join("");
}
render();