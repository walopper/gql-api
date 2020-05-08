import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Paginate, PaginateFn } from '../../graphql/libs/cursor-connection/paginate.decorator';
import { DataloaderFn, Loader } from '../../graphql/libs/dataloader';
import { Company } from '../company/company.entity';
import { Contact, ContactConnection } from './contact.entity';
import { CompanyService } from '../company/company.service';
import { Inject } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactListArgs } from './args/contact-list.args';
import { Fields } from '../../graphql/decorators/fields.decorator';
//import { ServerError } from '../../utils/errorHandler';
//import { WHERE_INPUT } from '../../config/errorCodes';

@Resolver(of => Contact)
export class ContactResolver {
    @Inject()
    protected contactService: ContactService;

    @Inject()
    protected companyService: CompanyService;

    @Query(type => ContactConnection, { name: 'contacts' })
    async getContacts(
        @Paginate() paginate: PaginateFn<Contact>,
        @Fields() fields: string[],
        @Args() listArgs: ContactListArgs,
    ): Promise<[Contact[], number]> {
        return paginate(pagination =>
            this.contactService.getListAndCount({
                fields,
                pagination,
                where: listArgs.where,
                orderBy: listArgs.order_by,
            }),
        );

        /*
        const ERROR_INVALID_FORM_DATA = {message: "Invalid form data", code: 190, error_subcode: 460};
        throw new UserInputError(ERROR_INVALID_FORM_DATA);
        */

        /*
          "error": {
            "message": "Message describing the error",
            //"type": "OAuthException",
            "code": 190,
            "error_subcode": 460,
            "fbtrace_id": "EJplcsCHuLu"
          }
          */

        /*
            {
              "message": "requested list items count limit reached",
              "code": 400,
              "type": "bad_user_input",
              "subcode": 636,
            }
        */
    }

    @ResolveField(type => Company, { name: 'company', nullable: true })
    async getCompany(
        @Loader({ typeOrm: 'Company' }) loader: DataloaderFn<number[], Company>,
        @Fields() fields: string[],
    ): Promise<Company> {
        //Dataloader Batch
        return loader(async (companiesIds: number[]) => {
            return this.companyService.getList({ fields, where: { id: { _in: companiesIds } } });
        });
    }
}
