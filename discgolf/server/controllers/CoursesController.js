import { Auth0Provider } from "@bcwdev/auth0provider";
import { coursesService } from "../services/CoursesService.js";
import BaseController from "../utils/BaseController.js";

export class CoursesController extends BaseController {
  constructor() {
    super('api/courses')
    this.router
      .get('', this.getCourses)
      .get('/:courseId', this.getCourseById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCourse)
      .put('/:courseId', this.updateCourse)
      .delete('/:courseId', this.removeCourse)
  }
  async getCourses(req, res, next) {
    try {
      const courses = await coursesService.getCourses()
      return res.send(courses)
    } catch (error) {
      next(error)
    }
  }

  async getCourseById(req, res, next) {
    try {
      const courseId = req.params.courseId
      const course = await coursesService.getCourseById(courseId)
      if (!course) {
        return res.send(`Course with id: ${courseId} does not exist.`)
      }
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async createCourse(req, res, next) {
    try {
      const courseData = req.body
      courseData.accountId = req.userInfo.id
      const course = await coursesService.createCourse(courseData)
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async updateCourse(req, res, next) {
    try {
      const courseId = req.params.courseId
      const accountId = req.userInfo.id
      const courseData = req.body
      const course = await coursesService.updateCourse(courseId, accountId, courseData)
      if (!course) {
        return res.send(`Course with id: ${courseId} does not exist.`)
      }
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async removeCourse(req, res, next) {
    try {
      const courseId = req.params.courseId
      const accountId = req.userInfo.id
      await coursesService.removeCourse(courseId, accountId)
      return res.send(`Course with id: ${courseId} was successfully removed.`)
    } catch (error) {
      next(error)
    }
  }
}