import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";




@Module({
    controllers:[UsersController],
    providers:[UserService],
    imports:[TypeOrmModule.forFeature([User])],
})
export class UserModule{

}