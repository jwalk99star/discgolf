import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService{
  async getComments() {
    
    const res = await api.get('api/comments')
    console.log('getting comments data', res.data);
    AppState.comments = res.data.map(comment => new Comment(comment))    
  }



  async createComment(formData) {
    const activeCourse = AppState.activeCourse

    formData.courseId = activeCourse.id

    const res = await api.post('api/comments', formData)

    const newComment = new Comment(res.data)

    AppState.comments.push(newComment)

    AppState.emit('comments')
  }

}

export const commentsService = new CommentsService()