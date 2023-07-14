import { AppState } from "../AppState.js"
import { Course } from "../models/Course.js"
import { coursesService } from "../services/CoursesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function showCourseFormButton() {
    // console.log("'button active")

    const account = AppState.account
    if (!account) {
        return
    } const courseFormButton = document.getElementById('courseFormButton')
    // @ts-ignore
    courseFormButton.classList.remove('d-none')

}

function _drawCourses() {
    let course = AppState.courses
    let template = ''
    course.forEach(c => template += c.coursesCardTemplate)
    setHTML('coursesCard', template)
}

export class CoursesController {
    constructor() {
        console.log('course controller working')

        this.getCourses()
        // AppState.on('account', this.getCourses)
        AppState.on('account', showCourseFormButton)
        AppState.on('courses', _drawCourses)

    }
    async getCourses() {
        try {
            await coursesService.getCourses()
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    setCourseForm() {
        setHTML('modal-guts', Course.CourseForm)
    }
}