import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../DTO/create-user.dto';
import { Response } from "../models/response.interface"
import { EditUserDto } from '../DTO/edit-user.dto';
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    _getUsers() {
        return this.userService.getUser();
    }
    @Post()
    async _createUser(@Body() createUserDto: CreateUserDto): Promise<Response> {
        console.log(createUserDto)
        return await this.userService.createUser(createUserDto);
    }

    @Put("/:id")
    async _editUser(@Body() editedUser: EditUserDto, @Param("id",ParseIntPipe) id: number) {
        return await this.userService.editUser(id,editedUser)
    }
    @Delete("/:id")
    async _deleteUser( @Param("id",ParseIntPipe) id: number) {
        return await this.userService.delete(id)
    }

}
