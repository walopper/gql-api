import _ from 'lodash';
import { QueryRunner, SelectQueryBuilder as BaseSelectQueryBuilder } from 'typeorm';

export class SelectQueryBuilder<Entity> extends BaseSelectQueryBuilder<Entity> {
    async getRawMany<T = unknown>(): Promise<T[]> {
        //Remove duplicate joins
        this.removeDuplicateJoins();

        return super.getRawMany<T>();
    }

    protected async executeEntitiesAndRawResults(
        queryRunner: QueryRunner,
    ): Promise<{ entities: Entity[]; raw: unknown[] }> {
        //Remove duplicate joins
        this.removeDuplicateJoins();

        return super.executeEntitiesAndRawResults(queryRunner);
    }

    protected createSelectExpression(): string {
        const originalSelectExpression = super.createSelectExpression();

        /*
         HACK to remove duplicate selections
         */
        const select = this.createSelectDistinctExpression();

        const fromIndex = originalSelectExpression.lastIndexOf(' FROM ');
        const from = originalSelectExpression.substr(fromIndex);

        const selection = originalSelectExpression.substring(select.length, fromIndex);
        const selectionArr = _.uniq(selection.split(', '));

        return select + selectionArr.join(', ') + from;
    }

    protected removeDuplicateJoins(): void {
        for (const i in this.expressionMap.joinAttributes) {
            const joinAttribute = this.expressionMap.joinAttributes[i];

            const duplicateJoinsIndexes = _.chain(this.expressionMap.joinAttributes)
                .pickBy({ entityOrProperty: joinAttribute.entityOrProperty, alias: joinAttribute.alias })
                .keys()
                .map((n) => parseInt(n, 10))
                .value();

            //Select the best candidate for the Join Attribute from the duplicate values
            let selectedJoinAttribute;
            let selectedJoinAttributeIndex: number;
            for (const o of duplicateJoinsIndexes) {
                const duplicatejoinAttribute = this.expressionMap.joinAttributes[o];

                if (!selectedJoinAttribute) {
                    selectedJoinAttribute = duplicatejoinAttribute;
                    selectedJoinAttributeIndex = o;
                }

                //INNER has priority over LEFT join
                if (duplicatejoinAttribute.direction === 'INNER') {
                    selectedJoinAttribute = duplicatejoinAttribute;
                    selectedJoinAttributeIndex = o;
                    break;
                }
            }

            if (selectedJoinAttribute) {
                //Replace lower position duplicate join (["LEFT contact.company", "LEFT company.organization", "INNER contact.company"])
                //Hacemos esto para asegurarnos que no se rompa un "join" que dependia del orden de esta relación
                const duplicateJoinsMinIndex = Math.min(...duplicateJoinsIndexes);
                this.expressionMap.joinAttributes[duplicateJoinsMinIndex] = selectedJoinAttribute;

                //Remove the rest of the duplicate joins attributes
                for (const o of duplicateJoinsIndexes) {
                    if (o !== duplicateJoinsMinIndex) {
                        this.expressionMap.joinAttributes.splice(o, 1);
                    }
                }
            }
        }
    }
}
