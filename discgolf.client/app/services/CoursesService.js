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

}

export const coursesService = new CoursesServices()