import React, { ComponentType } from 'react';
import styled, { css } from '../../styled-components';

import { Loud, Quiet, Cone } from '../icons/Volume';
import { SliderInput } from '../SliderInput';
import { sizes, withPx } from '../../theme';
import { Bar, BaseBarsContainer } from '../Bars';
import { rangeThumb } from '../../styled-mixins/inputRange';

interface Props {
  // Number between 0 and 1 representing the volume.
  volume: number;

  // Called when the volume changes.
  onVolume: (newVolume: number) => void;
}

// A slider which ranges from [0, 1] and has speaker icons to match the
// current volume.
export const VolumeSlider = (props: Props) => (
  <VolumeSliderContainer>
    <VolumeIconContainer>
      <VolumeIcon svgClass={iconSvgClass} volume={props.volume} />
    </VolumeIconContainer>

    <SliderContainer>
      <VolumeSliderBar position={props.volume} />

      <VolumeSliderInput
        min={0}
        max={100}
        value={props.volume * 100}
        onValueChange={newVolume => props.onVolume(newVolume / 100)}
      />
    </SliderContainer>
  </VolumeSliderContainer>
);

interface VolumeIconProps extends IconComponentProps {
  volume: number;
}

const VolumeIcon = ({ volume, svgClass }: VolumeIconProps) => {
  const Icon = getIconComponent(volume);
  return <Icon svgClass={svgClass} />;
};

interface IconComponentProps {
  svgClass: string;
}

function getIconComponent(volume: number): ComponentType<IconComponentProps> {
  if (volume < 0.15) {
    return Cone;
  } else if (volume < 0.75) {
    return Quiet;
  } else {
    return Loud;
  }
}

const VolumeSliderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const iconSvgClass = 'svgIcon';

// TODO: Remove This Container
const VolumeIconContainer = styled.div`
  & .${iconSvgClass} {
    display: block;
    width: ${props => props.theme.secondaryButtonSize};
    height: ${props => props.theme.secondaryButtonSize};
    margin-right: ${props => props.theme.sizeVeryTiny};
  }
`;

const thumbSize = 12;
const thumbRadius = thumbSize / 2;
const sliderWidth = 100;
const sliderHeight = sizes.veryTiny;
const sliderRadius = sizes.veryTiny;
const unfilledColor = '#333333';
const filledColor = '#777777';
const thumbColor = '#aaaaaa';

const SliderContainer = styled(BaseBarsContainer)`
  border-radius: ${withPx(sliderRadius)};

  width: ${withPx(sliderWidth)};
  height: ${withPx(sliderHeight)};

  background: ${unfilledColor};
  margin-right: ${withPx(sizes.small)};
`;

const VolumeSliderBar = styled(Bar)`
  border-top-left-radius: ${withPx(sliderRadius)};
  border-bottom-left-radius: ${withPx(sliderRadius)};

  background: ${filledColor};
`;

const VolumeSliderInput = styled(SliderInput)`
  margin-left: ${withPx(-1 * thumbRadius)};
  width: ${withPx(2 * thumbRadius + sliderWidth)};

  ${rangeThumb(css`
    cursor: pointer;
    border-radius: ${withPx(thumbRadius)};
    width: ${withPx(thumbSize)};
    height: ${withPx(thumbSize)};
    background: ${thumbColor};
  `)};
`;
