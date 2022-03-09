import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandonCourse } from './utils/randomCourse';
const N_COURSES = 5;
function createCourses(){
    const courses = [];
    for(let i = 0; i < N_COURSES; i++){
        courses.push(getRandonCourse(courseData));
    }
    return courses;
}
const courses = createCourses();
const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);

const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course Name'},
    {key: 'lecturer', displayName: 'Lecturer Name'},
    {key: 'cost', displayName: 'Cost (ILS)'},
    {key: 'hours', displayName: 'Course Duration (h)'}
], "courses-table");

const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const message = dataProcessor.addCourse(course);
    if (typeof(message) !== 'string'){
    return '';
    }
    return message;
})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("course-lecturer-options", courseData.lectors);

window.showForm = () => {
    formHandler.show();
    tableHandler.hideTable();
}
window.showCourses = () => {
    tableHandler.showTable(dataProcessor.getAllCourses());
    formHandler.hideTable;
}