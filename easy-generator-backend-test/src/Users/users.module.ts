import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./users.model";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]), ],
    providers: [UserService, ],
    controllers: [UserController],
})

export class UserModule {}