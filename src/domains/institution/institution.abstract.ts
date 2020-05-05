import { Field, ID } from '@nestjs/graphql';
import { IInstitution } from './institution.interface';
import { Institution } from './institution.entity';
import { AfterLoad, BaseEntity, BeforeInsert, getConnection, JoinColumn, OneToOne } from 'typeorm';

export abstract class AInstitution extends BaseEntity implements IInstitution {
    abstract id: number;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    level: number;

    /*
    @OneToOne(_ => Institution)
    @JoinColumn({ name: 'id' })
    Institution: Institution;

    @AfterLoad()
    hydrateInstitution(): void {
        if (this.Institution) {
            this.name = this.Institution.name;
            this.level = this.Institution.level;
        }
    }

    @BeforeInsert()
    async createInstitution(): Promise<void> {
        const entityName = this.constructor.name;
        const institutionProps: string[] = getConnection()
            .getMetadata(Institution)
            .ownColumns.map(column => column.propertyName);

        //Create Institution
        const institution = new Institution();
        institution.type = entityName;

        for (const prop of institutionProps) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            if (this[prop]) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                institution[prop] = this[prop];
            }
        }

        await getConnection()
            .getRepository(Institution)
            .save(institution);

        //Update main entity id
        this.id = institution.id;
    }
     */
}
