import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { PermissionRule } from '@domains/user/role/permission/permission-rule.entity';

@Entity({ name: 'role' })
export class Role {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    institution_type: string;

    @Column({ name: 'lft' })
    nestedset_left: number;

    @Column({ name: 'rgt' })
    nestedset_right: number;

    @Column({ name: 'level' })
    nestedset_level: number;

    @OneToMany(
        _type => PermissionRule,
        permission => permission.Role,
    )
    PermissionRules: PermissionRule[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
