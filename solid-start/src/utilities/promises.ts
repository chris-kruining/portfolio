export const allFullfilled = async <T extends readonly unknown[] | []>(
    values: T,
    errorMessage: string,
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> => {
    const results = await Promise.allSettled(values);
    const rejected = results.filter((r) => r.status === 'rejected').map((r) => (r as PromiseRejectedResult).reason);

    if (rejected.length > 0) {
        return Promise.reject(new Error(errorMessage, { cause: rejected }));
    }

    type Fullfilled = { -readonly [P in keyof T]: PromiseFulfilledResult<Awaited<T[P]>> };
    type Unwrapped = { -readonly [P in keyof T]: Awaited<T[P]> };

    return (results as Fullfilled).map((r) => r.value) as Unwrapped;
};

export const delay = (timeInMilliseconds: number) => new Promise((res) => setTimeout(res, timeInMilliseconds));
