export class Course {
  constructor(data) {
    // console.log('data', data)
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.imgUrl = data.imgUrl
    this.difficulty = data.difficulty
    this.accountId = data.accountId
  }

  get coursesCardTemplate() {
    return /*html*/`
    <div onclick="app.CoursesController.setActiveCourse('${this.id}')" class="card selectable" style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#modal">
        <img src="${this.imgUrl}" class="card-img-top" alt="${this.name}">
        <div class="card-body">
        <p class="card-name">${this.name}</p>
        </div>
    </div>
        `
  }

  get activeTemplate() {
    return /*html*/`
    <div class="modal-content ps-3">
        <div class="modal-header pb-2">
            <h1 class="modal-title fs-5" id="">${this.name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
        <img src="${this.imgUrl}" alt="${this.name}">
        <p>${this.description}</p>
        <p>Difficulty: ${this.difficulty}</p>
        </div>
    </div>
        `
  }

  static get CourseForm() {
    return /*html*/`
    <div class="modal-content ps-3">
        <div class="modal-header pb-2">
            <h1 class="modal-title fs-5" id="">Course</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
            <form onsubmit="app.CoursesController.createCourse(event)">
            <div class="pb-2">
                <!-- <label for="name">name of course</label> -->
                <input type="text" name="name" id="name" minlength="1" maxlength="75" required placeholder="Name of Course">
            </div>
            <div class="pb-2">
                <!-- <label for="imgUrl">Course Img</label> -->
                <input type="url" name="imgUrl" id="imgUrl" required minlength="2" maxlength="300" placeholder="imgUrl">
            </div>
            <div class="pb-2">
                <!-- <label for="description">Course Description</label> -->
                <textarea placeholder="Course Description" name="description" id="description" cols="30"
                rows="10"></textarea>
            </div>
            <div class="pb-2">
                <label for="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty">
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
            </form>
        </div>
    </div>
        `
  }
}