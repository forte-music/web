import * as withSideEffect from 'react-side-effect';
import { last } from '../utils';

interface Props {
  // The first title with this prop set will be used, otherwise the
  // innermost rendered element will be rendered.
  important?: boolean;

  // The title will be set to these segments separated by pipe characters.
  segments?: string[];
}

const Title = () => null;

const reducePropsToState = (propsList: Props[]) => {
  const firstImportantIdx = propsList.findIndex(
    ({ important = false }) => important
  );
  if (firstImportantIdx !== -1) {
    return propsList[firstImportantIdx];
  }

  return last(propsList) || {};
};

function handleStateChangeOnClient({ segments = [] }: Props) {
  document.title = [...segments, 'Forte'].join(' | ');
}

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(
  Title
);
