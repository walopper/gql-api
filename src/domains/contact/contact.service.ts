import { ContactRepository } from './contact.repository';
import { Contact } from './contact.entity';
import { ContactQueryWhereInput } from './inputs/contact-query-where.input';
import { ContactQueryOrderByInput } from './inputs/contact-query-orderby.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '../../shared/base-classes/base-entity-service';
import { QueryOptions } from '../../shared/types/query-options.type';
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ContactService extends BaseEntityService<Contact> {
    @InjectRepository(ContactRepository)
    protected readonly repository: ContactRepository;

    protected checkFieldsAuthorization(fields: string[]): void {
        if (fields.indexOf('sex') !== -1) {
            throw new UnauthorizedException('No tiene permiso del field sex');
        }

        return;
    }

    protected getQueryBuilder(queryOptions: QueryOptions<ContactQueryWhereInput, ContactQueryOrderByInput>) {
        const query = super.getQueryBuilder(queryOptions);

        //Ejemplo de como limitar al usuario a solo ver los contactos de su compañía
        query.andWhere(`${query.alias}.company_id = :contactCompanyId`, { contactCompanyId: this.authUser.company_id });

        return query;
    }
}
