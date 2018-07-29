import { css } from '../../styled-components';
import { InterpolationValue } from 'styled-components';

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
  interpolated: InterpolationValue[]
) => {
  const rules = selectors
    .map(selector => `&${selector} { ${interpolated} }`)
    .join('\n');

  return css`
    ${rules};
  `;
};

export const rangeTrack = makeDuplicatorForSelectors(trackSelectors);

export const rangeThumb = makeDuplicatorForSelectors(thumbSelectors);
