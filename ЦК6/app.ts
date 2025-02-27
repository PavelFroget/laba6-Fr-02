function stopChange(constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}
function toUpperCase(
    target: any,
    key: string,
    prop: PropertyDescriptor
) {
    const originalMethod = prop.value;
    prop.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        if (typeof result === "string") {
            return result.toUpperCase();
        }
        return result;
    };
    return prop;
}
@stopChange
class Car {
    constructor(public mark: string, public model: string) { }
    @toUpperCase
    getText(): string {
        return `${this.mark} ${this.model}`;
    }
}
const car = new Car("Lada", "Priora");
console.log(car.getText()); 
