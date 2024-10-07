import { useRef } from "react";
import { useCallback } from "react";
import { memo } from "react";
import * as React from 'react';
import type { OptionEditProps } from '..';
import { View, Text, Switch } from 'react-native';
import type { GpsInfo } from '../../../modules/theta-client';
import { InputNumber } from '../../ui/input-number';
import { InputString } from '../../ui/input-string';
import styles from './styles';
import Button from '../../ui/button';
interface Props extends OptionEditProps {
  hideLabel?: boolean;
}
export const GpsInfoEdit: React.FC<Props> = memo(({
  onChange,
  options,
  hideLabel = false
}) => {
  const [editGpsInfo, setEditGpsInfo] = React.useState<GpsInfo>();
  const useGpsInfo = React.useState(false);
  const getDateTimeZone = () => {
    const dt = new Date();
    const y = dt.getFullYear();
    const mm = ('00' + (dt.getMonth() + 1)).slice(-2);
    const dd = ('00' + dt.getDate()).slice(-2);
    const HH = ('00' + dt.getHours()).slice(-2);
    const MM = ('00' + dt.getMinutes()).slice(-2);
    const SS = ('00' + dt.getSeconds()).slice(-2);
    const offset = dt.getTimezoneOffset();
    const offsetHH = ('00' + Math.floor(Math.abs(offset) / 60)).slice(-2);
    const offsetMM = ('00' + Math.abs(offset) % 60).slice(-2);
    const offsetSign = offset < 0 ? '+' : '-';
    const result = `${y}:${mm}:${dd} ${HH}:${MM}:${SS}${offsetSign}${offsetHH}:${offsetMM}`;
    return result;
  };
  const defaultInfo = React.useMemo<GpsInfo>(() => {
    return {
      latitude: 35.485577,
      longitude: 134.24005,
      altitude: 47.1,
      dateTimeZone: getDateTimeZone()
    };
  }, []);
  const infoDisable: GpsInfo = {
    latitude: 65535,
    longitude: 65535,
    altitude: 0,
    dateTimeZone: ''
  };
  const isUseGpsInfo = () => {
    return hideLabel || useGpsInfo.current;
  };
  React.useEffect(() => {
    const gpsInfo = options?.gpsInfo || {
      ...defaultInfo
    };
    setEditGpsInfo(gpsInfo);
  }, [options, defaultInfo]);
  const onChangeUseGpsInfo = (newValue: boolean) => {
    useGpsInfo.current = newValue;
    if (!newValue) {
      // keep values of editGpsInfo
      const newOptions = options && {
        ...options,
        gpsInfo: undefined
      };
      onChange(newOptions ?? {});
    } else {
      const newGpsInfo = editGpsInfo == null ? {
        ...defaultInfo
      } : {
        ...editGpsInfo
      };
      setEditGpsInfo(newGpsInfo);
      const newOptions = {
        ...options,
        gpsInfo: newGpsInfo
      };
      onChange(newOptions);
    }
  };
  return <View>
      <View style={styles.rowContainerLayout}>
        {!hideLabel && <View style={isUseGpsInfo() ? styles.colContainerLayout : styles.rowContainerLayout}>
            <Text style={styles.labelText}>gpsInfo</Text>
            <Switch value={isUseGpsInfo()} onValueChange={onChangeUseGpsInfo} />
          </View>}
        {isUseGpsInfo() && <View style={styles.colContainerLayout}>
            <View style={styles.rowContainerLayout}>
              <Button style={styles.button} title="Set disable" onPress={useCallback(() => {
            const newGpsInfo = {
              ...infoDisable
            };
            setEditGpsInfo(newGpsInfo);
            const newOptions = {
              ...options,
              gpsInfo: newGpsInfo
            };
            onChange(newOptions);
          }, [options, setEditGpsInfo])} />
              <Button style={styles.button} title="Set dummy" onPress={useCallback(() => {
            const newGpsInfo = {
              ...defaultInfo
            };
            setEditGpsInfo(newGpsInfo);
            const newOptions = {
              ...options,
              gpsInfo: newGpsInfo
            };
            onChange(newOptions);
          }, [options, setEditGpsInfo])} />
            </View>
            <InputNumber title={'latitude'} onChange={useCallback(newValue => {
          if (editGpsInfo != null) {
            const targetValue = newValue ?? 0;
            const newInfo: GpsInfo = {
              ...editGpsInfo,
              latitude: targetValue
            };
            setEditGpsInfo(newInfo);
            onChange({
              ...options,
              gpsInfo: newInfo
            });
          }
        }, [options, editGpsInfo, setEditGpsInfo])} value={options?.gpsInfo?.latitude} />
            <InputNumber title={'longitude'} onChange={useCallback(newValue => {
          if (editGpsInfo != null) {
            const targetValue = newValue ?? 0;
            const newInfo: GpsInfo = {
              ...editGpsInfo,
              longitude: targetValue
            };
            setEditGpsInfo(newInfo);
            onChange({
              ...options,
              gpsInfo: newInfo
            });
          }
        }, [options, editGpsInfo, setEditGpsInfo])} value={options?.gpsInfo?.longitude} />
            <InputNumber title={'altitude'} onChange={useCallback(newValue => {
          if (editGpsInfo != null) {
            const targetValue = newValue ?? 0;
            const newInfo: GpsInfo = {
              ...editGpsInfo,
              altitude: targetValue
            };
            setEditGpsInfo(newInfo);
            onChange({
              ...options,
              gpsInfo: newInfo
            });
          }
        }, [options, editGpsInfo, setEditGpsInfo])} value={options?.gpsInfo?.altitude} />
            <InputString title={'dateTimeZone'} onChange={useCallback(newValue => {
          if (editGpsInfo != null) {
            const newInfo: GpsInfo = {
              ...editGpsInfo,
              dateTimeZone: newValue
            };
            setEditGpsInfo(newInfo);
            onChange({
              ...options,
              gpsInfo: newInfo
            });
          }
        }, [options, editGpsInfo, setEditGpsInfo])} value={options?.gpsInfo?.dateTimeZone} />
          </View>}
      </View>
    </View>;
});
GpsInfoEdit.displayName = 'GpsInfoEdit';
export default GpsInfoEdit;