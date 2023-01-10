import { createContext } from "react";

const BaseContext = createContext(null);
const BaseConsumer = BaseContext.Consumer;
const BaseProvider = BaseContext.Provider;

export { BaseConsumer, BaseProvider };

export default BaseContext;
