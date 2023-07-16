import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawComments() {
  let comments = AppState.comments
  let template = ''

  comments.forEach(comment => template += comment.CommentTemplate)
  setHTML('comment-content', template)
}


export class CommentsController {
  constructor() {
    console.log('comments controller');

    AppState.on('activeCourse', this.getCommentsByActiveCourse)
    AppState.on('comments', _drawComments)

  }
  async getCommentsByActiveCourse() {
    try {
      await commentsService.getCommentsByActiveCourse()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async createComment(event) {
    try {
      event.preventDefault()

      let form = event.target
      let formData = getFormData(form)

      await commentsService.createComment(formData)
      form.reset()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

}