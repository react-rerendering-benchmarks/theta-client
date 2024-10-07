import { useCallback } from "react";
import { memo } from "react";
import * as React from 'react';
import { TimeShift, TimeShiftIntervalEnum } from '../../../modules/theta-client';
import { EnumEdit, type OptionEditProps } from '..';
import { View } from 'react-native';
import { TitledSwitch } from '../../ui/titled-switch';
export const TimeShiftEdit: React.FC<OptionEditProps> = memo(({
  onChange,
  options
}) => {
  const [editTimeShift, setEditTimeSHift] = React.useState<TimeShift>({});
  React.useEffect(() => {
    const timeShift = options?.timeShift || {};
    if (timeShift.isFrontFirst == null) {
      timeShift.isFrontFirst = true;
    }
    setEditTimeSHift(timeShift);
  }, [options]);
  return <View>
      <TitledSwitch title="isFrontFirst" value={editTimeShift.isFrontFirst} onChange={useCallback(isFrontFirst => {
      const timeShift = {
        ...editTimeShift,
        isFrontFirst
      };
      setEditTimeSHift(timeShift);
      onChange({
        timeShift
      });
    }, [editTimeShift, setEditTimeSHift])} />
      <EnumEdit title={'firstInterval'} option={editTimeShift.firstInterval} onChange={useCallback(firstInterval => {
      const timeShift = {
        ...editTimeShift,
        firstInterval
      };
      setEditTimeSHift(timeShift);
      onChange({
        timeShift
      });
    }, [editTimeShift, setEditTimeSHift])} optionEnum={TimeShiftIntervalEnum} />
      <EnumEdit title={'secondInterval'} option={editTimeShift.secondInterval} onChange={useCallback(secondInterval => {
      const timeShift = {
        ...editTimeShift,
        secondInterval
      };
      setEditTimeSHift(timeShift);
      onChange({
        timeShift
      });
    }, [editTimeShift, setEditTimeSHift])} optionEnum={TimeShiftIntervalEnum} />
    </View>;
});
TimeShiftEdit.displayName = 'TimeShiftEdit';
export default TimeShiftEdit;