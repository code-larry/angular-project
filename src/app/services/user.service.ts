import { Subject } from "rxjs/Subject"
import { User } from "../models/User.model"

export class UserService {

  private users: User[] = [
    new User(
      'Larry',
      'Basin',
      'larry@gmail.com',
      'coca',
      ['coder', 'danser']
    )
  ]
  userSubject = new Subject<User[]>()

  emitUsers() {
    this.userSubject.next(this.users.slice())
  }

  addUser(user: User) {
    this.users.push(user)
    this.emitUsers()
  }

}
