import { Company } from '@domains/company/company.entity';
import { Contact } from '@domains/contact/contact.entity';
import { ContactRepository } from '@domains/contact/contact.repository';
import { ContactQueryOrderByInput } from '@domains/contact/inputs/contact-query-orderby.input';
import { ContactQueryWhereInput } from '@domains/contact/inputs/contact-query-where.input';
import { LoggedUserService } from '@domains/core/logged-user/logged-user.service';
import { Injectable, Scope, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService, BaseServiceGetMethodOptions } from '@shared/base-classes/base-entity-service';
import { QueryOptions } from '@shared/types/query-options.type';
import { SelectQueryBuilder } from '@shared/utils/select-query-builder';
import _ from 'lodash';

@Injectable({ scope: Scope.REQUEST })
export class ContactService extends BaseEntityService<Contact, ServiceGetMethodOptions> {
    @InjectRepository(ContactRepository)
    protected readonly repository: ContactRepository;

    @Inject(LoggedUserService)
    protected readonly loggedUserService: LoggedUserService;

    protected async beforeGet(
        query: SelectQueryBuilder<Contact>,
        queryOptions: QueryOptions<ContactQueryWhereInput, ContactQueryOrderByInput>,
        options: ServiceGetMethodOptions,
    ): Promise<void> {
        //Field authorization
        if (queryOptions.fields.indexOf('sex') !== -1) {
            throw new UnauthorizedException('No tiene permiso del field sex');
        }

        // const loggedUser = await this.loggedUserService.getUser();

        //Validar que el usuario loggeado tenga permiso para la compañía solicitada
        if (!this.loggedUserService.hasInstitutionAccess([options.companyId])) {
            throw new UnauthorizedException('You don\'t have acess to this company');
        }

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
        const companiesIds = _.map(result, 'company_id');
        if (!this.loggedUserService.hasInstitutionAccess(companiesIds)) {
            throw new UnauthorizedException('No tiene permiso del field sex');
        }

    }
}

interface ServiceGetMethodOptions extends BaseServiceGetMethodOptions {
    companyId: Company['id'];
}
