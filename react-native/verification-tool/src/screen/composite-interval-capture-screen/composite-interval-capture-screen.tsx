import { useRef } from "react";
import { useCallback } from "react";
import React from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Button from '../../components/ui/button';
import { CapturingStatusEnum, CompositeIntervalCapture, Options, getCompositeIntervalCaptureBuilder, stopSelfTimer } from '../../modules/theta-client';
import { CaptureCommonOptionsEdit } from '../../components/capture/capture-common-options';
import { InputNumber } from '../../components/ui/input-number';
import { NumberEdit } from '../../components/options/number-edit';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
const CompositeIntervalCaptureScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'compositeIntervalCapture'>> = ({
  navigation
}) => {
  const [interval, setInterval] = React.useState<number>();
  const [shootingTimeSec, setShootingTimeSec] = React.useState<number>(600);
  const [message, setMessage] = React.useState('');
  const capturingStatus = React.useState<CapturingStatusEnum>();
  const progress = React.useState<number>();
  const [captureOptions, setCaptureOptions] = React.useState<Options>();
  const [isTaking, setIsTaking] = React.useState(false);
  const capture = React.useState<CompositeIntervalCapture>();
  const onTake = useCallback(async () => {
    if (isTaking) {
      return;
    }
    const builder = getCompositeIntervalCaptureBuilder(shootingTimeSec);
    if (interval != null) {
      builder.setCheckStatusCommandInterval(interval);
    }
    if (captureOptions?.compositeShootingOutputInterval != null) {
      builder.setCompositeShootingOutputInterval(captureOptions.compositeShootingOutputInterval);
    }
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
    console.log('CompositeIntervalCapture interval: ' + interval);
    console.log('CompositeIntervalCapture options: ' + JSON.stringify(captureOptions));
    console.log('CompositeIntervalCapture builder: ' + JSON.stringify(builder));
    try {
      capture.current = await builder.build();
      setIsTaking(false);
    } catch (error) {
      setIsTaking(false);
      Alert.alert('CompositeIntervalCapture build error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  }, [interval, shootingTimeSec, captureOptions, isTaking, setIsTaking, setCapture]);
  const initCapture = () => {
    capture.current = undefined;
    setIsTaking(false);
  };
  const startCapture = async () => {
    if (capture.current == null) {
      initCapture();
      return;
    }
    progress.current = undefined;
    capturingStatus.current = undefined;
    try {
      console.log('CompositeIntervalCapture startCapture');
      const urls = await capture.current.startCapture(completion => {
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
      if (urls) {
        Alert.alert(`file ${urls.length} urls : `, urls.join('\n'), [{
          text: 'OK'
        }]);
      } else {
        Alert.alert('Capture', 'Capture cancel', [{
          text: 'OK'
        }]);
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
    navigation.setOptions({
      title: 'interval composite shooting'
    });
  }, [navigation]);
  React.useEffect(() => {
    if (capture.current != null && !isTaking) {
      setIsTaking(true);
      startCapture();
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
          <Button style={styles.button} title="start" onPress={onTake} disabled={isTaking} />
          <Button style={styles.button} title="cancel" onPress={onCancel} disabled={!isTaking} />
        </View>
        <Button style={styles.button} title="stop self timer" onPress={onStopSelfTimer} disabled={!isTaking} />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <InputNumber title="CheckStatusCommandInterval" placeHolder="Input value" value={interval} onChange={useCallback(value => {
          setInterval(value);
        }, [setInterval])} />
          <InputNumber title="shooting Time Sec" placeHolder="Input value" value={shootingTimeSec} onChange={useCallback(value => {
          setShootingTimeSec(value ?? 600);
        }, [setShootingTimeSec])} />
          <NumberEdit propName={'compositeShootingOutputInterval'} onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} placeHolder="Input value" />
          <CaptureCommonOptionsEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
        </ScrollView>
      </View>
    </SafeAreaView>;
};
export default CompositeIntervalCaptureScreen;