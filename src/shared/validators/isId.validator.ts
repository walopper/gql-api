import { registerDecorator } from "class-validator";

export function IsNumericId() {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "IsNumericId",
            target: object.constructor,
            propertyName,
            constraints: [],
            validator: {
                validate(value: number) {
                    return !value && (+value < 1e20 && +value > 0)
                }
            }
        });
    };
}
