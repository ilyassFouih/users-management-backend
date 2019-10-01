import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import { getResponse, Status, Response } from '../models/response.interface';
import { CreateUserDto } from '../DTO/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { EditUserDto } from '../DTO/edit-user.dto';

@Injectable()
export class UserService {
    
    
   async delete(id: number) {
       let user = await this.findUserById(id)
       if(user){
           await UserEntity.remove(user)
           return getResponse(Status.SUCCESS,"removed user with success !",user)
       }else {
           return getResponse(Status.LOGIC_ERROR,"user not found !")
       }
    }
    async getUser(): Promise<Response> {
        let users: User[] = await UserEntity.find()
        if (users.length == 0)
            return getResponse(Status.LOGIC_ERROR, "no user found ! ")
        else
            return getResponse(Status.SUCCESS, "found " + users.length + " user !", users)
    }


    async createUser(createUserDto: CreateUserDto): Promise<Response> {
        let user = { 
            id:-1,
            imageUrl:this.getUserAvatar(createUserDto.firstName,createUserDto.lastname),
            ...createUserDto 
        }
        let createdUser = await UserEntity.save(user)
        return getResponse(Status.SUCCESS, "created user with success ! ", createdUser)
    }
  
    async editUser(id: number, editUserDto: EditUserDto) {
        let oldUser = await this.findUserById(id)
        let editedUser
        let createdUser
        if (oldUser) {
            editedUser = { id:id
                ,imageUrl:this.getUserAvatar(editUserDto.firstName,editUserDto.lastname)
                , ...editUserDto }
             createdUser = await UserEntity.save(editedUser)
          return getResponse(Status.SUCCESS,"edited User with success !",createdUser)
        }else
        return getResponse(Status.LOGIC_ERROR,"no user found with id "+id)
    }

    private async findUserById(id: number): Promise<UserEntity> {
        let user: UserEntity[] = await UserEntity.findByIds([id])
        return user[0];

    }
    private getUserAvatar(firstName:string,lastName:string):string{
        return "https://ui-avatars.com/api/?name="
        +firstName+" "+lastName
        +"&rounded=true&bold=true"
    }
}
