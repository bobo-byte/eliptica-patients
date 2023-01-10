import React, { ComponentType } from "react";
import Screen, { IScreenProps } from "../Screen";

/**
 * Wrapper for props passed to {@link Screen}
 * {@link IScreenProps} screenProps
 */
export type IWithScreenProps = {
  screenProps: Omit<IScreenProps, "children">;
};

/**
 * HOC function for wrapping any component with context state.
 * Applicable to screen components.
 * @param properities {@link IWithScreenProps}
 * @returns a wrapped component as a child of {@link Screen} with context state
 */
export function withScreen<T extends object>(properities: IWithScreenProps) {
  return function WrappedComponent(Component: ComponentType<T>) {
    return function WrappedComponentWithProps(props: T) {
      return (
        <Screen {...properities.screenProps}>
          <Component {...props} />
        </Screen>
      );
    };
  };
}
