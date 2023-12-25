export function unSelect<T extends object, K extends keyof T>(
	obj: T,
	keys: K[],
): Omit<T, K> {
	// using {...obj } => mutate
	const result = JSON.parse(JSON.stringify(obj)) as T;

	for (const key of keys) {
		if (key in obj) {
			delete result[key];
		}
	}

	return result;
}

export function select<T extends object, K extends keyof T>(
	obj: T,
	keys: K[],
): Pick<T, K> {
	const result = {} as Pick<T, K>;

	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key];
		}
	}

	return result;
}
