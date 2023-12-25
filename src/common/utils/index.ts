export type Unselect<T, K extends keyof T> = (obj: T, keys: K[]) => Omit<T, K>;

export function unSelect<T extends object, K extends keyof T>(
	obj: T,
	keys: K[],
): Omit<T, K> {
	const result = JSON.parse(JSON.stringify(obj)) as T;
	// const result = {} as Omit<T, K>;
	for (const key of keys) {
		if (key in obj) {
			delete result[key];
		}
	}

	return result as Omit<T, K>;
}
