import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../company/company.entity';
import { Contact } from './contact.entity';
import { CompanyService } from '../company/company.service';
import { ContactQueryOrderByInput } from './inputs/contact-query-orderby.input';
import { ContactQueryWhereInput } from './inputs/contact-query-where.input';
//import { ServerError } from '../../utils/errorHandler';
//import { WHERE_INPUT } from '../../config/errorCodes';
import { DataloaderFn, Loader } from '../../shared/graphql/libs/dataloader';

@Resolver(() => Contact)
export class ContactResolver {
    @Query(type => Contact)
    async contacts(
        @Args('first', { nullable: true }) first?: number,
        @Args('last', { nullable: true }) last?: number,
        @Args('before', { nullable: true }) before?: string,
        @Args('after', { nullable: true }) after?: string,
        @Args('where', { nullable: true }) where?: ContactQueryWhereInput,
        @Args('order_by', { nullable: true }) orderBy?: ContactQueryOrderByInput,
    ): Promise<Contact[]> {
        //throw new ServerError(WHERE_INPUT.INVALID_EMAIL_ADDR);

        return [];

        /*
        return container
            .get(ContactService)
            .getListAndCount({ pagination: { first, last, before, after }, where, orderBy });
        */
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

    @ResolveField(() => Company)
    async company(@Loader({ typeORM: true }) loader: DataloaderFn<number, Company>) {
        return [];
        /*
        //Dataloader Batch
        return loader(async (companiesIds: number[]) => {
            return container.get(CompanyService).getList({ where: { id: { _in: companiesIds } } });
        });

         */
    }
}
