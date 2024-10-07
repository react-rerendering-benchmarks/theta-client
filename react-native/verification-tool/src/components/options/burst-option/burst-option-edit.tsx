import { useCallback } from "react";
import { memo } from "react";
import * as React from 'react';
import type { OptionEditProps } from '../../options';
import { View } from 'react-native';
import { EnumEdit } from '../../options/enum-edit';
import { BurstBracketStepEnum, BurstCaptureNumEnum, BurstCompensationEnum, BurstEnableIsoControlEnum, BurstMaxExposureTimeEnum, BurstOrderEnum } from '../../../modules/theta-client';
export const BurstOptionsEdit: React.FC<OptionEditProps> = memo(({
  onChange,
  options
}) => {
  return <View>
      <EnumEdit title={'burstCaptureNum'} option={options?.burstOption?.burstCaptureNum} onChange={useCallback(burstCaptureNum => {
      const newOptions = {
        ...options,
        burstOption: {
          ...options?.burstOption,
          burstCaptureNum
        }
      };
      onChange(newOptions);
    }, [options])} optionEnum={BurstCaptureNumEnum} />
      <EnumEdit title={'burstBracketStep'} option={options?.burstOption?.burstBracketStep} onChange={useCallback(burstBracketStep => {
      const newOptions = {
        ...options,
        burstOption: {
          ...options?.burstOption,
          burstBracketStep
        }
      };
      onChange(newOptions);
    }, [options])} optionEnum={BurstBracketStepEnum} />
      <EnumEdit title={'burstCompensation'} option={options?.burstOption?.burstCompensation} onChange={useCallback(burstCompensation => {
      const newOptions = {
        ...options,
        burstOption: {
          ...options?.burstOption,
          burstCompensation
        }
      };
      onChange(newOptions);
    }, [options])} optionEnum={BurstCompensationEnum} />
      <EnumEdit title={'burstMaxExposureTime'} option={options?.burstOption?.burstMaxExposureTime} onChange={useCallback(burstMaxExposureTime => {
      const newOptions = {
        ...options,
        burstOption: {
          ...options?.burstOption,
          burstMaxExposureTime
        }
      };
      onChange(newOptions);
    }, [options])} optionEnum={BurstMaxExposureTimeEnum} />
      <EnumEdit title={'burstEnableIsoControl'} option={options?.burstOption?.burstEnableIsoControl} onChange={useCallback(burstEnableIsoControl => {
      const newOptions = {
        ...options,
        burstOption: {
          ...options?.burstOption,
          burstEnableIsoControl
        }
      };
      onChange(newOptions);
    }, [options])} optionEnum={BurstEnableIsoControlEnum} />
      <EnumEdit title={'burstOrder'} option={options?.burstOption?.burstOrder} onChange={useCallback(burstOrder => {
      const newOptions = {
        ...options,
        burstOption: {
          ...options?.burstOption,
          burstOrder
        }
      };
      onChange(newOptions);
    }, [options])} optionEnum={BurstOrderEnum} />
    </View>;
});
BurstOptionsEdit.displayName = 'BurstOptionsEdit';
export default BurstOptionsEdit;