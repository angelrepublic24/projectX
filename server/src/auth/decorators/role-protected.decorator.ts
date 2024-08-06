/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/common/interfaces/valid-roles';

export const META_ROLES = 'user_role'

export const RoleProtected = (...args: ValidRoles[]) =>{
     return SetMetadata(META_ROLES, args);
    }
