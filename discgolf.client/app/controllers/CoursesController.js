import { AppState } from "../AppState.js"
import { Course } from "../models/Course.js"
import { coursesService } from "../services/CoursesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function showCourseFormButton() {
  // console.log("'button active")

  const account = AppState.account
  if (!account) {
    return
  }
  const courseFormButton = document.getElementById('courseFormButton')
  // @ts-ignore
  courseFormButton.classList.remove('d-none')

}

function _drawCourses() {
  let course = AppState.courses
  let template = ''
  course.forEach(c => template += c.coursesCardTemplate)
  setHTML('coursesCard', template)
}

function _drawActiveCourse() {
  console.log('drawing active course')
  const activeCourse = AppState.activeCourse
  // @ts-ignore
  setHTML('modal-guts', activeCourse.activeTemplate)
}

export class CoursesController {
  constructor() {
    console.log('course controller working')

    this.getCourses()
    // AppState.on('account', this.getCourses)
    AppState.on('account', showCourseFormButton)
    AppState.on('courses', _drawCourses)
    AppState.on('activeCourse', _drawActiveCourse)

  }
  async getCourses() {
    try {
      await coursesService.getCourses()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async createCourse(event) {
    event.preventDefault()
    try {
      const form = event.target
      const formData = getFormData(form)
      console.log(formData)
      await coursesService.createCourse(formData)
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#modal').hide()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async deleteCourse() {
    console.log('deleting button works. deleting course: ', AppState.activeCourse)
      const wantsToDelete = await Pop.confirm('Delete this Course?')

      if (!wantsToDelete) {
        return
      }
    try {
      await coursesService.deleteCourse()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#modal').hide()
    } catch (error) {
      console.error(error)
      Pop
    }
  }

  setActiveCourse(courseId) {
    coursesService.setActiveCourse(courseId)
  }

  setCourseForm() {
    setHTML('modal-guts', Course.CourseForm)
  }
}