declare module 'react-side-effect' {
  import * as React from 'react';

  declare function withSideEffect<TProp, TState>(
    reducePropsToState: (propsList: TProp[]) => TState,
    handleStateChangeOnClient: (state: TState) => void,
    mapStateOnServer?: (state: TState) => void
  ): ClassDecorator<TProp>;

  type ClassDecorator<TProp> = <
    TInnerComponent extends React.ComponentType<TProp>
  >(
    component: TInnerComponent
  ) => React.ComponentType<TProp>;

  declare namespace withSideEffect {

  } // https://github.com/Microsoft/TypeScript/issues/5073

  export = withSideEffect;
}
