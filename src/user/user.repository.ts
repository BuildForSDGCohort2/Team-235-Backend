import { Injectable, Inject } from "@nestjs/common";
import { User } from "./user.model";
import { Repository } from "src/shared/repository/repository";

@Injectable()
export class UserRepository implements Repository<string, User> {
  update(arg0: any): User | PromiseLike<User> {
      throw new Error("Method not implemented.");
  }

  constructor(
    @Inject(User)
    private readonly userModel: typeof User
  ) { }

  async find(id: string): Promise<User> {
    return await this.userModel.query().findById(id)
      .withGraphFetched("*");
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.query().findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.query()
      .withGraphFetched("*");
  }


  async save(user: User): Promise<User> {
    if(user.id && await this.find(user.id)){
      return await this.userModel.query().upsertGraphAndFetch(user, {
        relate: true,
        noDelete: true
      })
    }
    return await this.userModel.query().upsertGraphAndFetch(user, { 
      relate: true,
      noUpdate: true,
      noDelete: true
    });
  }


  async remove(user: User): Promise<void> {
    await this.userModel.query().delete().where(user);
  }
}
