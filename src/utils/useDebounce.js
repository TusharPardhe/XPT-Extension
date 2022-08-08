import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {

    const [state, setState] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setState(value);
        }, [delay]);

        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay]);

    return state;
}

export default useDebounce;