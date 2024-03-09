const ReactX = (() => {
    let hooks = [];
    let index = 0;


    const useState = (initialValue) => {
        const localIndex = index;
        index++;
        if (hooks[localIndex] === undefined) {
            hooks[localIndex] = initialValue;
        }
        const setterFunction = (newValue) => {
            hooks[localIndex] = newValue;
        }
        return [hooks[localIndex], setterFunction]
    }


    const useEffect = (callback, dependencyArray) => {
        let hasChanged = true;
        const oldDependencies = hooks[index];
        if (oldDependencies) {
            hasChanged = false;
            dependencyArray.forEach((dependency, ind) => {
                const oldDependency = oldDependencies[ind];
                const areTheSame = Object.is(oldDependency, dependency);
                if (!areTheSame) {
                    hasChanged = true;
                }
            })
        }
        if (hasChanged) {
            callback();
        }
        hooks[index] = dependencyArray;
        index++;
    }

    const resetIndex = () => {
        index = 0;
    }
    return {
        useState, useEffect, resetIndex
    };
})