import 'reflect-metadata';

function Injectable(key: string) {
	return (target: Function): void => {
		Reflect.defineMetadata(key, 1, target);
		const meta = Reflect.getMetadata(key, target);
		console.log({ meta });
	};
}

function Prop(target: Object, name: string): void {
	console.log('');
}

@Injectable('C')
export class C {
	@Prop props: number;
}

@Injectable('D')
export class D {
	// constructor(@Inject('C') c: C) {
	//
	// }
}
