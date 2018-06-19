declare module 'react-virtual-list' {
  import * as React from 'react';

  export interface DefaultState {
    firstItemIndex: number;
    lastItemIndex: number;
  }

  export interface DefaultVirtualProps<TItem> {
    virtual: {
      items: TItem[];
      style: object;
    };
  }

  export interface Options<TState> {
    container: Element;
    initialState: Partial<TState>;
  }

  export interface InputProps<TItem> {
    items: TItem[];
    itemHeight: number;
    itemBuffer?: number;
  }

  interface VirtualListDecarator<TInputProps, TVirtualProps, TState> {
    <T extends React.ComponentType<TVirtualProps & TInputProps>>(
      inner: T
    ): React.ComponentClass<TInputProps>;
  }

  function hoc<
    TInputProps = InputProps<any>,
    TVirtualProps = DefaultVirtualProps<any>,
    TState = DefaultState
  >(
    options?: Options<TState>,
    mapVirtualToProps?: (props: TInputProps, state: TState) => TVirtualProps
  ): VirtualListDecarator<TInputProps, TVirtualProps, TState>;

  export default hoc;
}
