import _ from 'lodash';
import { ContactRepository } from './contact.repository';
import { Contact } from './contact.entity';
import { ContactQueryWhereInput } from './inputs/contact-query-where.input';
import { ContactQueryOrderByInput } from './inputs/contact-query-orderby.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService, BaseServiceGetMethodOptions } from '../../shared/base-classes/base-entity-service';
import { QueryOptions } from '../../shared/types/query-options.type';
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { SelectQueryBuilder } from '../../shared/utils/select-query-builder';
import { Company } from '../company/company.entity';

@Injectable({ scope: Scope.REQUEST })
export class ContactService extends BaseEntityService<Contact, ServiceGetMethodOptions> {
    @InjectRepository(ContactRepository)
    protected readonly repository: ContactRepository;

    protected async beforeGet(
        query: SelectQueryBuilder<Contact>,
        queryOptions: QueryOptions<ContactQueryWhereInput, ContactQueryOrderByInput>,
        options: ServiceGetMethodOptions,
    ): Promise<void> {
        console.log(options);

        //Field authorization
        if (queryOptions.fields.indexOf('sex') !== -1) {
            throw new UnauthorizedException('No tiene permiso del field sex');
        }

        //Validar que el usuario loggeado tenga permiso para la compañía solicitada
        /*
        if (!this.loggedUserService.hasInstitutionAccess(options.companyId)) {
            throw new UnauthorizedException('No tiene permiso del field sex');
        }
        */

        //Ejemplo de como limitar al usuario a solo ver los contactos de su compañía
        query.andWhere(`${query.alias}.company_id = :contactCompanyId`, { contactCompanyId: options.companyId });
    }

    protected async afterGet(
        query: SelectQueryBuilder<Contact>,
        queryOptions: QueryOptions<ContactQueryWhereInput, ContactQueryOrderByInput>,
        options: ServiceGetMethodOptions,
        result: Contact[],
    ): Promise<void> {
        //Validar que el usuario loggeado tenga permiso para la compañía que recibio
        //Parece repetitivo pero si hace un service.findOne, no se valida en el 'beforeGet'
        /*
        const companiesIds = _.map(result, 'company_id');
        if (!this.loggedUserService.hasInstitutionAccess(companiesIds)) {
            throw new UnauthorizedException('No tiene permiso del field sex');
        }
        */
    }
}

interface ServiceGetMethodOptions extends BaseServiceGetMethodOptions {
    companyId?: Company['id'];
}
