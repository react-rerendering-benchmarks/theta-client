import { useRef } from "react";
import { useCallback } from "react";
import React from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Button from '../../components/ui/button';
import { CapturingStatusEnum, ContinuousCapture, ContinuousNumberEnum, Options, PhotoFileFormatEnum, getContinuousCaptureBuilder, stopSelfTimer } from '../../modules/theta-client';
import { CaptureCommonOptionsEdit } from '../../components/capture/capture-common-options';
import { InputNumber } from '../../components/ui/input-number';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { EnumEdit } from '../../components/options';
const ContinuousCaptureScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'continuousCapture'>> = ({
  navigation
}) => {
  const [interval, setInterval] = React.useState<number>();
  const [message, setMessage] = React.useState('');
  const capturingStatus = React.useState<CapturingStatusEnum>();
  const progress = React.useState<number>();
  const [captureOptions, setCaptureOptions] = React.useState<Options>();
  const [isTaking, setIsTaking] = React.useState(false);
  const capture = React.useState<ContinuousCapture>();
  const [continuousNumber, setContinuousNumber] = React.useState<ContinuousNumberEnum>(ContinuousNumberEnum.OFF);
  const onTake = useCallback(async () => {
    if (isTaking) {
      return;
    }
    const builder = getContinuousCaptureBuilder();
    if (interval != null) {
      builder.setCheckStatusCommandInterval(interval);
    }
    captureOptions?.fileFormat && builder.setFileFormat((captureOptions.fileFormat as PhotoFileFormatEnum));
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
    console.log('ContinuousCapture interval: ' + interval);
    console.log('ContinuousCapture options: ' + JSON.stringify(captureOptions));
    console.log('ContinuousCapture builder: ' + JSON.stringify(builder));
    try {
      capture.current = await builder.build();
      setIsTaking(false);
    } catch (error) {
      setIsTaking(false);
      if (error instanceof Error) {
        Alert.alert('ContinuousCaptureBuilder build error', error.name + ': ' + error.message, [{
          text: 'OK'
        }]);
      }
    }
  }, [interval, captureOptions, isTaking, setIsTaking, setCapture]);
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
      console.log('ContinuousCapture startCapture');
      const number = await capture.current.getContinuousNumber();
      setContinuousNumber(number);
      const urls = await capture.current.startCapture(completion => {
        if (isTaking) return;
        progress.current = completion;
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
      if (error instanceof Error) {
        Alert.alert('startCapture error', error.name + ': ' + error.message, [{
          text: 'OK'
        }]);
      }
    }
  };
  const onStopSelfTimer = useCallback(async () => {
    try {
      await stopSelfTimer();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('stopSelfTimer error', error.name + ': ' + error.message, [{
          text: 'OK'
        }]);
      }
    }
  }, []);
  React.useEffect(() => {
    navigation.setOptions({
      title: 'continuous shooting'
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
        <Text style={styles.itemText}>
          ContinuousNumber = {continuousNumber}
        </Text>
        <View style={styles.bottomViewContainerLayout}>
          <Button style={styles.button} title="start" onPress={onTake} disabled={isTaking} />
          <Button style={styles.button} title="stop self timer" onPress={onStopSelfTimer} disabled={!isTaking} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <InputNumber title="CheckStatusCommandInterval" placeHolder="Input value" value={interval} onChange={useCallback(value => {
          setInterval(value);
        }, [setInterval])} />
          <EnumEdit title={'fileFormat'} option={captureOptions?.fileFormat} onChange={useCallback(fileFormat => {
          setCaptureOptions(prevState => ({
            ...prevState,
            fileFormat
          }));
        }, [setCaptureOptions])} optionEnum={PhotoFileFormatEnum} />
          <CaptureCommonOptionsEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
        </ScrollView>
      </View>
    </SafeAreaView>;
};
export default ContinuousCaptureScreen;