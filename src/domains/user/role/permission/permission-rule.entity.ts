import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from '@domains/user/role/role.entity';

@Entity({ name: 'permission_rule' })
export class PermissionRule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Role)
    @JoinColumn({ name: 'role_id' })
    Role: Role;

    @Column()
    role_id: number;

    @ManyToOne(type => Permission)
    @JoinColumn({ name: 'permission_id' })
    Permission: Permission;

    @Column()
    permission_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
