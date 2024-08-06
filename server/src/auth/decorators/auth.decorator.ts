/* eslint-disable prettier/prettier */
import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "src/common/interfaces/valid-roles";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";



export const Auth = (...user_role: ValidRoles[]) => {
    return applyDecorators(
        RoleProtected(...user_role),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}