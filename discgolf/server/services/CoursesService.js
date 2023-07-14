import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CoursesService {
  async getCourses() {
    const courses = await dbContext.Courses.find()
    return courses
  }

  async getCourseById(courseId) {
    const course = await dbContext.Courses.findById(courseId)
    if (!course) {
      throw new BadRequest(`Course with id: ${courseId} does not exist.`)
    }
    return course
  }

  async createCourse(courseData) {
    const course = await dbContext.Courses.create(courseData)
    return course
  }

  async updateCourse(courseId, accountId, courseData) {
    const targetCourse = await this.getCourseById(courseId)
    if (!targetCourse) {
      return null
    }
    if (accountId != targetCourse.accountId.toString()) {
      throw new Forbidden('Insufficient permisions to update this course.')
    }
    const mutableProperties = ['name', 'description', 'imgUrl', 'difficulty']
    mutableProperties.forEach(mp => {
      if (mp in courseData) {
        targetCourse[mp] = courseData[mp]
      }
    })
    await targetCourse.save()
    return targetCourse
  }

  async removeCourse(courseId, accountId) {
    const targetCourse = await this.getCourseById(courseId)
    if (accountId != targetCourse.accountId.toString()) {
      throw new Forbidden('Insufficient permisions to update this course.')
    }
    await targetCourse.remove()
  }
}

export const coursesService = new CoursesService()