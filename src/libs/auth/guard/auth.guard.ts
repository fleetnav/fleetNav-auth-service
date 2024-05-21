import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import { ROLES_KEY } from '../../decorators/roles/roles.decorators';
import { Role } from '../../decorators/roles/role.enum';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(AtGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('IsPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.some((role) => user.roles?.includes(role))) {
      this.logger.warn(`User with roles ${user.roles} attempted to access restricted route`);
      throw new UnauthorizedException('Access Denied: Insufficient permissions');
    }

    return true;
  }

  handleRequest(err, user, info: Error) {
    if (err || info) {
      this.logger.error(`JWT error: ${info.message || err}`);
      throw new HttpException('Token is expired!', HttpStatus.UNAUTHORIZED);
    }

    if (!user) {
      this.logger.warn('Access Denied: Unauthorized access attempt');
      throw new UnauthorizedException('Access Denied.');
    }

    return user;
  }
}
