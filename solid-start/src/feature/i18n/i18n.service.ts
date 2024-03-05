
type Context = {
    language: string;
};

export const translate = (key: string, context: Context) => {
    return `"${key}" ${context.language}`;
};