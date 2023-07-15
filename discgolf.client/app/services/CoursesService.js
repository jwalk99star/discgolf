import { AppState } from "../AppState.js"
import { Course } from "../models/Course.js"
import { api } from "./AxiosService.js"

class CoursesServices {
  async getCourses() {
    const res = await api.get('api/courses')
    console.log('Getting Courses', res.data)
    // @ts-ignore
    const courses = res.data.map(c => new Course(c))
    // console.log('these are my courses', courses);
    AppState.courses = courses
    console.log('appstate courses', AppState.courses);
  }

  async createCourse(formData) {
    const res = await api.post('api/courses', formData)

    const newCourse = new Course(res.data)
    AppState.courses.push(newCourse)
    AppState.emit('courses')
  }

  setActiveCourse(courseId) {
    const foundCourse = AppState.courses.find(course => course.id == courseId)
    console.log('active course', foundCourse)
    AppState.activeCourse = foundCourse
  }

  async deleteCourse() {
    const activeCourseId = AppState.activeCourse.id
    const res = await api.delete(`api/courses/${activeCourseId}`)
    const activeCourseIndex = AppState.courses.findIndex(c => c.id == activeCourseId)
    AppState.courses.splice(activeCourseIndex, 1)
    AppState.emit('courses')
  }

}

export const coursesService = new CoursesServices()