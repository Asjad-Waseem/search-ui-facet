import { createContext } from "react";

const Context = createContext({
    facetStateValues: {},
    setFacetStateValues: (auth) => {}
});

export default Context;