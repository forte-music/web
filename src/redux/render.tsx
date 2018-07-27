import React from 'react';
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
} from 'react-redux';

export interface BaseOwnProps<TMergedProps> {
  children: (mergedProps: TMergedProps) => React.ReactElement<any> | null;
}

// Creates a component which passes redux enhanced props its children. It is
// connected to redux with mapStateToProps and mapDispatchToProps.
export function createReduxComponent<
  State,
  TStateProps extends {},
  TDispatchProps extends {},
  TOwnProps extends BaseOwnProps<TStateProps & TDispatchProps> = BaseOwnProps<
    TStateProps & TDispatchProps
  >
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): React.ComponentType<TOwnProps> {
  // Props passed to the children function.
  type EnhancedProps = TStateProps & TDispatchProps;

  // Props passed to the inner component passed to redux connect.
  type MergedProps = BaseOwnProps<EnhancedProps> & EnhancedProps;

  // Component which will be connected with react-redux.
  const InnerComponent: React.ComponentType<MergedProps> = (
    props: MergedProps
  ) => props.children(props);

  const enhancer = connect(
    mapStateToProps,
    mapDispatchToProps,
    (
      stateProps: TStateProps,
      dispatchProps: TDispatchProps,
      ownProps: TOwnProps
    ): MergedProps =>
      Object.assign({}, stateProps, dispatchProps, {
        children: ownProps.children,
      })
  );

  return enhancer(InnerComponent);
}
