import { AppState } from "../AppState.js"
import { Course } from "../models/Course.js"
import { setHTML } from "../utils/Writer.js"


function showCourseFormButton() {
    // console.log("'button active")

    const account = AppState.account
    if (!account) {
        return
    } const courseFormButton = document.getElementById('courseFormButton')
    courseFormButton.classList.remove('d-none')

}
export class CourseController {
    constructor() {
        console.log('course controller working')

        AppState.on('account', showCourseFormButton)
    }

    setCourseForm() {
        setHTML('modal-guts', Course.CourseForm)
    }
}