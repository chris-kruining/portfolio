
export const equals = <T extends Record<string, any>>(obj1: T, obj2: T): boolean => {
    if(Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for(const [ key, value1 ] of Object.entries(obj1)) {
        if(Object.hasOwn(obj2, key) === false) {
            return false;
        }

        if(value1 !== obj2[key]){
            return false;
        }
    }

    return true;
};