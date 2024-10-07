import { useRef } from "react";
import { useCallback } from "react";
import React from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Button from '../../components/ui/button';
import { CaptureModeEnum, CapturingStatusEnum, Options, TimeShiftCapture, getTimeShiftCaptureBuilder, setOptions, stopSelfTimer } from '../../modules/theta-client';
import { CaptureCommonOptionsEdit } from '../../components/capture/capture-common-options';
import { TimeShiftEdit } from '../../components/options/time-shift';
import { InputNumber } from '../../components/ui/input-number';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
const TimeShiftCaptureScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'timeShiftCapture'>> = ({
  navigation
}) => {
  const [interval, setInterval] = React.useState<number>();
  const [message, setMessage] = React.useState('');
  const capturingStatus = React.useState<CapturingStatusEnum>();
  const progress = React.useState<number>();
  const [captureOptions, setCaptureOptions] = React.useState<Options>();
  const [isTaking, setIsTaking] = React.useState(false);
  const capture = React.useState<TimeShiftCapture>();
  const onTake = useCallback(async () => {
    if (isTaking) {
      return;
    }
    const builder = getTimeShiftCaptureBuilder();
    if (interval != null) {
      builder.setCheckStatusCommandInterval(interval);
    }
    captureOptions?.timeShift?.isFrontFirst && builder.setIsFrontFirst(captureOptions.timeShift.isFrontFirst);
    captureOptions?.timeShift?.firstInterval && builder.setFirstInterval(captureOptions.timeShift.firstInterval);
    captureOptions?.timeShift?.secondInterval && builder.setSecondInterval(captureOptions.timeShift.secondInterval);
    captureOptions?.aperture && builder.setAperture(captureOptions.aperture);
    if (captureOptions?.colorTemperature != null) {
      builder.setColorTemperature(captureOptions.colorTemperature);
    }
    captureOptions?.exposureCompensation && builder.setExposureCompensation(captureOptions.exposureCompensation);
    captureOptions?.exposureDelay && builder.setExposureDelay(captureOptions.exposureDelay);
    captureOptions?.exposureProgram && builder.setExposureProgram(captureOptions.exposureProgram);
    captureOptions?.gpsInfo && builder.setGpsInfo(captureOptions.gpsInfo);
    captureOptions?._gpsTagRecording && builder.setGpsTagRecording(captureOptions._gpsTagRecording);
    captureOptions?.iso && builder.setIso(captureOptions.iso);
    captureOptions?.isoAutoHighLimit && builder.setIsoAutoHighLimit(captureOptions.isoAutoHighLimit);
    captureOptions?.whiteBalance && builder.setWhiteBalance(captureOptions.whiteBalance);
    console.log('TimeShiftCapture interval: ' + interval);
    console.log('TimeShiftCapture options: ' + JSON.stringify(captureOptions));
    console.log('TimeShiftCapture builder: ' + JSON.stringify(builder));
    try {
      capture.current = await builder.build();
      setIsTaking(false);
    } catch (error) {
      setIsTaking(false);
      Alert.alert('TimeShiftCaptureBuilder build error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  }, [interval, captureOptions, isTaking, setIsTaking, setCapture]);
  const initCapture = () => {
    capture.current = undefined;
    setIsTaking(false);
  };
  const startTimeShiftCapture = async () => {
    if (capture.current == null) {
      initCapture();
      return;
    }
    progress.current = undefined;
    capturingStatus.current = undefined;
    try {
      console.log('startTimeShiftCapture startCapture');
      const url = await capture.current.startCapture(completion => {
        if (isTaking) return;
        progress.current = completion;
      }, error => {
        Alert.alert('Cancel error', JSON.stringify(error), [{
          text: 'OK'
        }]);
      }, status => {
        capturingStatus.current = status;
      });
      initCapture();
      if (url) {
        Alert.alert('TimeShift file url : ', url, [{
          text: 'OK'
        }]);
      } else {
        Alert.alert('TimeShift canceled.');
      }
    } catch (error) {
      initCapture();
      Alert.alert('startCapture error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  };
  const onCancel = useCallback(async () => {
    if (capture.current == null) {
      return;
    }
    console.log('ready to cancel...');
    try {
      capture.current.cancelCapture();
    } catch (error) {
      Alert.alert('stopCapture error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  }, [capture]);
  const onStopSelfTimer = useCallback(async () => {
    try {
      await stopSelfTimer();
    } catch (error) {
      Alert.alert('stopSelfTimer error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  }, []);
  React.useEffect(() => {
    setOptions({
      captureMode: CaptureModeEnum.IMAGE
    }).catch();
  }, []);
  React.useEffect(() => {
    navigation.setOptions({
      title: 'TimeShift Capture'
    });
  }, [navigation]);
  React.useEffect(() => {
    if (capture.current != null && !isTaking) {
      setIsTaking(true);
      startTimeShiftCapture();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capture.current]);
  React.useEffect(() => {
    setMessage(`progress = ${progress.current}\ncapturing = ${capturingStatus.current}`);
  }, [capturingStatus.current, progress.current]);
  return <SafeAreaView style={styles.safeAreaContainer} edges={['left', 'right', 'bottom']}>
      <View style={styles.topViewContainer}>
        <Text style={styles.itemText}>{message}</Text>
        <View style={styles.bottomViewContainerLayout}>
          <Button style={styles.button} title="take TimeShift" onPress={onTake} disabled={isTaking} />
          <Button style={styles.button} title="cancel" onPress={onCancel} disabled={!isTaking} />
        </View>
        <Button style={styles.button} title="stop self timer" onPress={onStopSelfTimer} disabled={!isTaking} />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <InputNumber title="CheckStatusCommandInterval" placeHolder="Input value" value={interval} onChange={useCallback(value => {
          setInterval(value);
        }, [setInterval])} />
          <TimeShiftEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
          <CaptureCommonOptionsEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
        </ScrollView>
      </View>
    </SafeAreaView>;
};
export default TimeShiftCaptureScreen;