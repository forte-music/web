import React from 'react';
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
} from 'react-redux';

export interface WithChildrenProp<TMergedProps> {
  children: (mergedProps: TMergedProps) => React.ReactElement<any> | null;
}

// Creates a component which passes redux enhanced props its children. It is
// connected to redux with mapStateToProps and mapDispatchToProps.
export function createReduxComponent<
  // Redux State
  State,
  // Props returned by mapStateToProps
  TStateProps extends {},
  // Props returned by mapDispatchToProps
  TDispatchProps extends {},
  // Helper type parameter to avoid having to pass in children prop type.
  TInnerOwnProps extends {} = {},
  // Props expected as input to the created component.
  TOwnProps extends WithChildrenProp<TStateProps & TDispatchProps> &
    TInnerOwnProps = WithChildrenProp<TStateProps & TDispatchProps> &
    TInnerOwnProps
>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): React.ComponentType<TOwnProps> {
  // Props passed to the children function.
  type EnhancedProps = TStateProps & TDispatchProps;

  // Props passed to the inner component passed to redux connect.
  type MergedProps = WithChildrenProp<EnhancedProps> & EnhancedProps;

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
