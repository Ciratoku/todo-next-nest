import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DashService } from "src/dash/dash.service";

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly dashService: DashService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const type = request.route.path.split("/")[2];
    let entity;
    switch (type) {
      case "dashes":
        entity = await this.dashService.findOne(id);
        break;
    }
    const user = request.user;
    if (entity && user && user.id === entity.user.id) return true;
    return false;
  }
}
