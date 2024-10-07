import { useRef } from "react";
import { useCallback } from "react";
import React from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Button from '../../components/ui/button';
import { BurstBracketStepEnum, BurstCapture, BurstCaptureNumEnum, BurstCompensationEnum, BurstEnableIsoControlEnum, BurstMaxExposureTimeEnum, BurstModeEnum, BurstOrderEnum, CapturingStatusEnum, Options, getBurstCaptureBuilder, stopSelfTimer } from '../../modules/theta-client';
import { CaptureCommonOptionsEdit } from '../../components/capture/capture-common-options';
import { InputNumber } from '../../components/ui/input-number';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { BurstOptionsEdit } from '../../components/options/burst-option';
import { EnumEdit } from '../../components/options';
const BurstCaptureScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'burstCapture'>> = ({
  navigation
}) => {
  const [interval, setInterval] = React.useState<number>();
  const [message, setMessage] = React.useState('');
  const capturingStatus = React.useState<CapturingStatusEnum>();
  const progress = React.useState<number>();
  const [captureOptions, setCaptureOptions] = React.useState<Options>();
  const [isTaking, setIsTaking] = React.useState(false);
  const capture = React.useState<BurstCapture>();
  const onTake = useCallback(async () => {
    if (isTaking || captureOptions?.burstOption?.burstCaptureNum == null || captureOptions?.burstOption?.burstBracketStep == null || captureOptions?.burstOption?.burstCompensation == null || captureOptions?.burstOption?.burstMaxExposureTime == null || captureOptions?.burstOption?.burstEnableIsoControl == null || captureOptions?.burstOption?.burstOrder == null) {
      return;
    }
    const builder = getBurstCaptureBuilder(captureOptions.burstOption.burstCaptureNum, captureOptions.burstOption.burstBracketStep, captureOptions.burstOption.burstCompensation, captureOptions.burstOption.burstMaxExposureTime, captureOptions.burstOption.burstEnableIsoControl, captureOptions.burstOption.burstOrder);
    if (interval != null) {
      builder.setCheckStatusCommandInterval(interval);
    }
    captureOptions?.burstMode && builder.setBurstMode(captureOptions.burstMode);
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
    console.log('BurstCapture interval: ' + interval);
    console.log('BurstCapture options: ' + JSON.stringify(captureOptions));
    console.log('BurstCapture builder: ' + JSON.stringify(builder));
    try {
      capture.current = await builder.build();
      setIsTaking(false);
    } catch (error) {
      setIsTaking(false);
      if (error instanceof Error) {
        Alert.alert('BurstCaptureBuilder build error', error.name + ': ' + error.message, [{
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
      console.log('BurstCapture startCapture');
      const urls = await capture.current.startCapture(completion => {
        if (isTaking) return;
        progress.current = completion;
      }, error => {
        if (error instanceof Error) {
          Alert.alert('Cancel error', error.name + ': ' + error.message, [{
            text: 'OK'
          }]);
        }
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
  const onCancel = useCallback(async () => {
    if (capture.current == null) {
      return;
    }
    console.log('ready to cancel...');
    try {
      capture.current.cancelCapture();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('stopCapture error', error.name + ': ' + error.message, [{
          text: 'OK'
        }]);
      }
    }
  }, [capture]);
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
      title: 'burst shooting'
    });
    setCaptureOptions({
      burstOption: {
        burstCaptureNum: BurstCaptureNumEnum.BURST_CAPTURE_NUM_9,
        burstBracketStep: BurstBracketStepEnum.BRACKET_STEP_0_0,
        burstCompensation: BurstCompensationEnum.BURST_COMPENSATION_0_0,
        burstMaxExposureTime: BurstMaxExposureTimeEnum.MAX_EXPOSURE_TIME_15,
        burstEnableIsoControl: BurstEnableIsoControlEnum.OFF,
        burstOrder: BurstOrderEnum.BURST_BRACKET_ORDER_0
      }
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
          <BurstOptionsEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
          <EnumEdit title={'burstMode'} option={captureOptions?.burstMode} onChange={useCallback(burstMode => {
          setCaptureOptions(captureOptionsCurrent => ({
            ...captureOptionsCurrent,
            burstMode
          }));
        }, [setCaptureOptions])} optionEnum={BurstModeEnum} />
          <CaptureCommonOptionsEdit onChange={useCallback(option => {
          setCaptureOptions(option);
        }, [setCaptureOptions])} options={captureOptions} />
        </ScrollView>
      </View>
    </SafeAreaView>;
};
export default BurstCaptureScreen;