import { useCallback } from "react";
import { memo } from "react";
import * as React from 'react';
import type { OptionEditProps } from '../../options';
import { View } from 'react-native';
import { GpsInfoEdit } from '../../../components/options';
import { NumberEdit } from '../../../components/options/number-edit';
import { EnumEdit } from '../../options/enum-edit';
import { ApertureEnum, ExposureCompensationEnum, ExposureDelayEnum, ExposureProgramEnum, GpsTagRecordingEnum, IsoAutoHighLimitEnum, IsoEnum, WhiteBalanceEnum } from '../../../modules/theta-client';
export const CaptureCommonOptionsEdit: React.FC<OptionEditProps> = memo(({
  onChange,
  options
}) => {
  return <View>
      <EnumEdit title={'aperture'} option={options?.aperture} onChange={useCallback(aperture => {
      onChange({
        ...options,
        aperture
      });
    }, [options])} optionEnum={ApertureEnum} />
      <NumberEdit propName={'colorTemperature'} onChange={useCallback(option => {
      onChange({
        ...options,
        colorTemperature: option.colorTemperature
      });
    }, [options])} options={options} placeHolder="Input value" />
      <EnumEdit title={'exposureCompensation'} option={options?.exposureCompensation} onChange={useCallback(exposureCompensation => {
      onChange({
        ...options,
        exposureCompensation
      });
    }, [options])} optionEnum={ExposureCompensationEnum} />
      <EnumEdit title={'exposureDelay'} option={options?.exposureDelay} onChange={useCallback(exposureDelay => {
      onChange({
        ...options,
        exposureDelay
      });
    }, [options])} optionEnum={ExposureDelayEnum} />
      <EnumEdit title={'exposureProgram'} option={options?.exposureProgram} onChange={useCallback(exposureProgram => {
      onChange({
        ...options,
        exposureProgram
      });
    }, [options])} optionEnum={ExposureProgramEnum} />
      <GpsInfoEdit onChange={useCallback(option => {
      onChange({
        ...options,
        gpsInfo: option.gpsInfo
      });
    }, [options])} options={options} />
      <EnumEdit title={'_gpsTagRecording'} option={options?._gpsTagRecording} onChange={useCallback(_gpsTagRecording => {
      onChange({
        ...options,
        _gpsTagRecording
      });
    }, [options])} optionEnum={GpsTagRecordingEnum} />
      <EnumEdit title={'iso'} option={options?.iso} onChange={useCallback(iso => {
      onChange({
        ...options,
        iso
      });
    }, [options])} optionEnum={IsoEnum} />
      <EnumEdit title={'isoAutoHighLimit'} option={options?.isoAutoHighLimit} onChange={useCallback(isoAutoHighLimit => {
      onChange({
        ...options,
        isoAutoHighLimit
      });
    }, [options])} optionEnum={IsoAutoHighLimitEnum} />
      <EnumEdit title={'whiteBalance'} option={options?.whiteBalance} onChange={useCallback(whiteBalance => {
      onChange({
        ...options,
        whiteBalance
      });
    }, [options])} optionEnum={WhiteBalanceEnum} />
    </View>;
});
CaptureCommonOptionsEdit.displayName = 'CaptureCommonOptionsEdit';
export default CaptureCommonOptionsEdit;