interface ITodoEntity {
	id: string;
	title: string;
	done: boolean;
	deadline: Date;
	createdAt: Date;
	userId: string;
}

export { ITodoEntity };
