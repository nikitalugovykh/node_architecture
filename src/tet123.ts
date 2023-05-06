function Component(id: number) {
	// console.log('init component');
	return (target: Function): void => {
		// console.log('run component');
		target.prototype.id = id;
	};
}

type LoggerReturn = (target: Function) => void;

function Logger(): LoggerReturn {
	console.log('init logger');
	return (target: Function): void => {
		console.log('run logger');
	};
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void {
	console.log(propertyKey);
	propertyDescriptor.value = function (...args: any[]): number {
		return args[0] * 10;
	};
}

function Prop(target: Object, propertyKey: string): void {
	let value: number;

	const getter = (): number => {
		console.log('get');
		return value;
	};

	const setter = (newValue: number): void => {
		console.log('set');
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

function Param(target: Object, propertyKey: string, index: number): void {
	console.log({ Param: 'Param', propertyKey, index });
}

@Logger()
@Component(1)
export class User {
	@Prop id: number;

	@Method
	updateId(@Param newId: number): number {
		this.id = newId;
		return this.id;
	}
}

console.log(new User().id);
console.log(new User().updateId(2));
