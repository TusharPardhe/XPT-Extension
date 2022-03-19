import { useReducer } from "react";

const useMergedState = (initialValues) => {
    const [state, setState] = useReducer(
        (prevState, updatedProperty) => ({
            ...prevState,
            ...updatedProperty,
        }),
        initialValues
    );

    return [state, setState];
};

export default useMergedState;
