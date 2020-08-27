import { Injectable, Inject } from "@nestjs/common";
import { User } from "./user.model";
import { Repository } from "src/shared/repository/repository";

@Injectable()
export class UserRepository implements Repository<User> {

  constructor(
    @Inject(User)
    private readonly userModel: typeof User
  ) {}

  async existsById(id: string): Promise<boolean> {
    return await this.find(id) != null;
  }


  async find(id: string): Promise<User> {
    return await this.userModel.query().findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.query().findOne({email});
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.query();
  }


  async save(user: User): Promise<User> {
    return await this.userModel.query().insertGraphAndFetch(user);
  }


  async remove(user: User): Promise<void> {
    await this.userModel.query().delete().where(user);
  }



}
