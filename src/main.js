import courseData from './config/courseData.json'
import College from './services/college';
//import Courses from './services/courses';
import { dataProvider } from './config/servises-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandonCourse } from './utils/randomCourse';
import _ from 'lodash';
import NavigatorButtons from './ui/navigator_buttons';
import Spinner from './ui/spinner';


const statisticsColumnDefinition = [
    {key: "minInterval", displayName: "From"},
    {key: "maxInterval", displayName: "To"},
    {key: "amount", displayName: "Amount"}
];
//const dataProvider = new Courses(courseData.minId, courseData.maxId);
const dataProcessor = new College(dataProvider, courseData);

const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course'},
    {key: 'lecturer', displayName: 'Lecturer'},
    {key: 'cost', displayName: 'Cost (ILS)'},
    {key: 'hours', displayName: 'Duration (h)'}
], "courses-table", "sortCourses", "removeCourse");

const formHandler = new FormHandler("courses-form", "alert");
const generationHandler = new FormHandler("generation-form", "alert");
const navigator = new NavigatorButtons(["0", "1", "2", "3", "4"]);
const spinner = new Spinner("spinner");
async function asyncRequestWithSpinner(asyncFn){
    spinner.start();
    const res = await asyncFn();
    spinner.stop();
    return res;
}
formHandler.addHandler(async course => { // await dataProcessor.addCourse(course)
    const message = await asyncRequestWithSpinner
    (dataProcessor.addCourse.bind(dataProcessor, course));
    if (typeof(message) !== 'string'){
    return '';
    }
    return message;
})
generationHandler.addHandler(async generation => {
    for(let i = 0; i < generation.nCourses; i++){
        asyncRequestWithSpinner(
        dataProcessor.addCourse.bind(dataProcessor, getRandonCourse(courseData)));
    }
    return '';
})
formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("course-lecturer-options", courseData.lectors);

const tableHourStatistics = 
new TableHandler(statisticsColumnDefinition, "hours-table");
const tableCostStatistics = 
new TableHandler(statisticsColumnDefinition, "cost-table");
function hide(){
    tableHandler.hideTable();
    formHandler.hide();
    generationHandler.hide();
    tableHourStatistics.hideTable();
    tableCostStatistics.hideTable();
}
window.showGeneration = () => {
    hide();
    navigator.setActive(4);
    generationHandler.show();
}
window.showForm = () => {
    hide();
    navigator.setActive(0)
    formHandler.show();
}
window.showCourses = async () => {
    hide();
    navigator.setActive(1);
    tableHandler.showTable(await dataProcessor.getAllCourses());
}
window.sortCourses = async (key) => {
    tableHandler.showTable(await asyncRequestWithSpinner 
        (dataProcessor.sortCourses(key)));
}
window.showHourStatistics = async () => {
    hide();
    navigator.setActive(2);
    tableHourStatistics.showTable(await asyncRequestWithSpinner 
        (dataProcessor.getHoursStatistics(courseData.hoursInterval)));
}
window.showCostStatistics = async () => {
    hide();
    navigator.setActive(3);
    tableCostStatistics.showTable(await asyncRequestWithSpinner 
        (dataProcessor.getCostStatistic(courseData.costInterval)));
}
window.removeCourse = async (id) => {
    if(window.confirm(`you are going to removecourse id:${id}`)){
    await dataProcessor.removeCourse(+id);
    tableHandler.showTable(await asyncRequestWithSpinner 
        (dataProcessor.getAllCourses()));
    }
}