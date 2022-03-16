import courseData from './courseData.json'
import Courses from '../services/courses'
export const dataProvider = new Courses(courseData.minId, courseData.maxId);