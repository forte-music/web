import { css } from '../styled-components';
import { FlattenSimpleInterpolation } from 'styled-components';

const trackSelectors = [
  '::-moz-range-track',
  '::-ms-track',
  '::-webkit-slider-runnable-track',
];

const thumbSelectors = [
  '::-moz-range-thumb',
  '::-ms-thumb',
  '::-webkit-slider-thumb',
];

const makeDuplicatorForSelectors = (selectors: string[]) => (
  interpolated: FlattenSimpleInterpolation
) => {
  const rules = selectors.map(
    selector =>
      css`
        &${selector} {
          ${interpolated};
        }
      `
  );

  return css`
    ${rules};
  `;
};

export const rangeTrack = makeDuplicatorForSelectors(trackSelectors);

export const rangeThumb = makeDuplicatorForSelectors(thumbSelectors);
