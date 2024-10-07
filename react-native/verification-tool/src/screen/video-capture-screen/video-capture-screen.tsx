import { useRef } from "react";
import { useCallback } from "react";
import React from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Button from '../../components/ui/button';
import { CaptureModeEnum, CapturingStatusEnum, MaxRecordableTimeEnum, Options, VideoCapture, VideoFileFormatEnum, getVideoCaptureBuilder, setOptions, stopSelfTimer } from '../../modules/theta-client';
import { CaptureCommonOptionsEdit } from '../../components/capture/capture-common-options';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { EnumEdit } from '../../components/options/enum-edit';
import { InputNumber } from '../../components/ui/input-number';
const VideoCaptureScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'videoCapture'>> = ({
  navigation
}) => {
  const [interval, setInterval] = React.useState<number>();
  const [message, setMessage] = React.useState('');
  const capturingStatus = React.useState<CapturingStatusEnum>();
  const [captureOptions, setCaptureOptions] = React.useState<Options>();
  const [isTaking, setIsTaking] = React.useState(false);
  const capture = React.useState<VideoCapture>();
  const onTake = useCallback(async () => {
    if (isTaking) {
      return;
    }
    const builder = getVideoCaptureBuilder();
    if (interval != null) {
      builder.setCheckStatusCommandInterval(interval);
    }
    captureOptions?.maxRecordableTime && builder.setMaxRecordableTime(captureOptions.maxRecordableTime);
    captureOptions?.fileFormat && builder.setFileFormat((captureOptions.fileFormat as VideoFileFormatEnum));
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
    console.log('videoCapture options: :' + JSON.stringify(captureOptions));
    console.log('videoCapture builder: :' + JSON.stringify(builder));
    try {
      capture.current = await builder.build();
      setIsTaking(false);
    } catch (error) {
      setIsTaking(false);
      Alert.alert('VideoCaptureBuilder build error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  }, [interval, captureOptions, isTaking, setIsTaking, setCapture]);
  const initCapture = () => {
    capture.current = undefined;
    setIsTaking(false);
  };
  const startVideoCapture = async () => {
    if (capture.current == null) {
      initCapture();
      return;
    }
    capturingStatus.current = undefined;
    try {
      console.log('startVideoCapture startCapture');
      const url = await capture.current.startCapture(error => {
        Alert.alert('stopCapture error', JSON.stringify(error), [{
          text: 'OK'
        }]);
      }, status => {
        capturingStatus.current = status;
      });
      initCapture();
      Alert.alert('video file url : ', url, [{
        text: 'OK'
      }]);
    } catch (error) {
      initCapture();
      Alert.alert('startCapture error', JSON.stringify(error), [{
        text: 'OK'
      }]);
    }
  };
  const onStop = useCallback(async () => {
    if (capture.current == null) {
      return;
    }
    console.log('ready to stop...');
    try {
      capture.current.stopCapture();
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
      captureMode: CaptureModeEnum.VIDEO
    }).catch();
  }, []);
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Video Capture'
    });
  }, [navigation]);
  React.useEffect(() => {
    if (capture.current != null && !isTaking) {
      setIsTaking(true);
      startVideoCapture();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capture.current]);
  React.useEffect(() => {
    setMessage(`capturing = ${capturingStatus.current}`);
  }, [capturingStatus.current]);
  return <SafeAreaView style={styles.safeAreaContainer} edges={['left', 'right', 'bottom']}>
      <View style={styles.topViewContainer}>
        <Text style={styles.itemText}>{message}</Text>
        <View style={styles.bottomViewContainerLayout}>
          <Button style={styles.button} title="take video" onPress={onTake} disabled={isTaking} />
          <Button style={styles.button} title="stop" onPress={onStop} disabled={!isTaking} />
        </View>
        <Button style={styles.button} title="stop self timer" onPress={onStopSelfTimer} disabled={!isTaking} />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <InputNumber title="CheckStatusCommandInterval" placeHolder="Input value" value={interval} onChange={useCallback(value => {
          setInterval(value);
        }, [setInterval])} />
          <EnumEdit title={'maxRecordableTime'} option={captureOptions?.maxRecordableTime} onChange={useCallback(maxRecordableTime => {
          setCaptureOptions(prevState => ({
            ...prevState,
            maxRecordableTime
          }));
        }, [setCaptureOptions])} optionEnum={MaxRecordableTimeEnum} />
          <EnumEdit title={'fileFormat'} option={captureOptions?.fileFormat} onChange={useCallback(fileFormat => {
          setCaptureOptions(prevState => ({
            ...prevState,
            fileFormat
          }));
        }, [setCaptureOptions])} optionEnum={VideoFileFormatEnum} />
          <CaptureCommonOptionsEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
        </ScrollView>
      </View>
    </SafeAreaView>;
};
export default VideoCaptureScreen;