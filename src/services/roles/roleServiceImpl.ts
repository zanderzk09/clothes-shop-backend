import { RoleService } from '../../interfaces/roleService';
import { Role } from '../../models';

export class RoleServiceImpl implements RoleService {

  async isValidRole(role: string): Promise<boolean> {
    const roleExists = await Role.findOne({ role });
    return !!roleExists;
  }

}

