declare module 'react-virtual-list' {
  import * as React from 'react';

  export interface DefaultState {
    firstItemIndex: number;
    lastItemIndex: number;
  }

  export interface Options<TState> {
    container: Element;
    initialState: Partial<TState>;
  }

  export interface VirtualProps<TItem> {
    virtual: {
      items: TItem[];
      style: object;
    };
  }

  export interface OwnProps<TItem> {
    items: TItem[];
    itemHeight: number;
    itemBuffer?: number;
  }

  type Decorator<TItem, TChildProps> = <
    TOuterProps extends OwnProps<TItem>,
    TMergedProps extends TOuterProps & TChildProps,
    TInnerProps
  >(
    inner: React.ComponentType<TMergedProps>
  ) => React.ComponentClass<TOuterProps>;

  function hoc<
    TItem,
    TMappedProps = VirtualProps<TItem>,
    TState extends DefaultState
  >(
    options?: Options<TState>,
    mapVirtualToProps?: (
      props: VirtualProps<TItem>,
      state: TState
    ) => TMappedProps
  ): Decorator<TItem, TMappedProps>;

  export default hoc;
}
