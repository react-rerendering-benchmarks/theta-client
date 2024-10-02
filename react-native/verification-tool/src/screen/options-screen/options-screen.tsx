import { useCallback } from "react";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Button from '../../components/ui/button';
import { ApertureEnum, BluetoothRoleEnum, CaptureModeEnum, ContinuousNumberEnum, ExposureCompensationEnum, ExposureDelayEnum, ExposureProgramEnum, FileFormatEnum, FilterEnum, IsoAutoHighLimitEnum, IsoEnum, MaxRecordableTimeEnum, OffDelayEnum, OptionNameEnum, Options, PresetEnum, SleepDelayEnum, TopBottomCorrectionOptionEnum, VideoStitchingEnum, VisibilityReductionEnum, WhiteBalanceEnum, getOptions, offDelayToSeconds, setOptions, sleepDelayToSeconds } from '../../modules/theta-client';
import { AutoBracketEdit, GpsInfoEdit, TimeShiftEdit, TopBottomCorrectionRotationEdit, EnumEdit, EthernetConfigEdit } from '../../components/options';
import { ItemSelectorView, type Item } from '../../components/ui/item-list';
import { NumberEdit } from '../../components/options/number-edit';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { InputNumber } from '../../components/ui/input-number';
interface OptionItem extends Item {
  value: {
    optionName: OptionNameEnum;
    editor?: (options: Options, onChange: (options: Options) => void) => React.ReactElement;
    defaultValue?: Options;
    onWillSet?: (options: Options) => void;
  };
}
const optionList: OptionItem[] = [{
  name: 'aperture',
  value: {
    optionName: OptionNameEnum.Aperture,
    editor: (options, onChange) => <EnumEdit title={'aperture'} option={options?.aperture} onChange={useCallback(aperture => {
      onChange({
        aperture
      });
    }, [])} optionEnum={ApertureEnum} />,
    defaultValue: {
      aperture: ApertureEnum.APERTURE_AUTO
    }
  }
}, {
  name: 'autoBracket',
  value: {
    optionName: OptionNameEnum.AutoBracket,
    editor: (options, onChange) => <ScrollView style={styles.autoBracketEditorLayout}>
          <AutoBracketEdit onChange={onChange} options={options} />
        </ScrollView>
  }
}, {
  name: 'bluetoothRole',
  value: {
    optionName: OptionNameEnum.BluetoothRole,
    editor: (options, onChange) => <EnumEdit title={'bluetoothRole'} option={options?.bluetoothRole} onChange={useCallback(bluetoothRole => {
      onChange({
        bluetoothRole
      });
    }, [])} optionEnum={BluetoothRoleEnum} />
  }
}, {
  name: 'captureMode',
  value: {
    optionName: OptionNameEnum.CaptureMode,
    editor: (options, onChange) => <EnumEdit title={'captureMode'} option={options?.captureMode} onChange={useCallback(captureMode => {
      onChange({
        captureMode
      });
    }, [])} optionEnum={CaptureModeEnum} />,
    defaultValue: {
      captureMode: CaptureModeEnum.IMAGE
    }
  }
}, {
  name: 'colorTemperature',
  value: {
    optionName: OptionNameEnum.ColorTemperature,
    editor: (options, onChange) => <NumberEdit propName={'colorTemperature'} onChange={onChange} options={options} />
  }
}, {
  name: 'continuousNumber',
  value: {
    optionName: OptionNameEnum.ContinuousNumber,
    editor: (options, onChange) => <EnumEdit title={'continuousNumber'} option={options.continuousNumber} onChange={useCallback(continuousNumber => {
      onChange({
        continuousNumber
      });
    }, [continuousNumber])} optionEnum={ContinuousNumberEnum} />,
    defaultValue: {
      continuousNumber: ContinuousNumberEnum.OFF
    }
  }
}, {
  name: 'ethernetConfig',
  value: {
    optionName: OptionNameEnum.EthernetConfig,
    editor: (options, onChange) => <EthernetConfigEdit onChange={onChange} options={options} />
  }
}, {
  name: 'exposureCompensation',
  value: {
    optionName: OptionNameEnum.ExposureCompensation,
    editor: (options, onChange) => <EnumEdit title={'exposureCompensation'} option={options.exposureCompensation} onChange={useCallback(exposureCompensation => {
      onChange({
        exposureCompensation
      });
    }, [])} optionEnum={ExposureCompensationEnum} />,
    defaultValue: {
      exposureCompensation: ExposureCompensationEnum.ZERO
    }
  }
}, {
  name: 'exposureDelay',
  value: {
    optionName: OptionNameEnum.ExposureDelay,
    editor: (options, onChange) => <EnumEdit title={'exposureDelay'} option={options?.exposureDelay} onChange={useCallback(exposureDelay => {
      onChange({
        exposureDelay
      });
    }, [])} optionEnum={ExposureDelayEnum} />,
    defaultValue: {
      exposureDelay: ExposureDelayEnum.DELAY_OFF
    }
  }
}, {
  name: 'exposureProgram',
  value: {
    optionName: OptionNameEnum.ExposureProgram,
    editor: (options, onChange) => <EnumEdit title={'exposureProgram'} option={options.exposureProgram} onChange={useCallback(exposureProgram => {
      onChange({
        exposureProgram
      });
    }, [])} optionEnum={ExposureProgramEnum} />,
    defaultValue: {
      exposureProgram: ExposureProgramEnum.NORMAL_PROGRAM
    }
  }
}, {
  name: 'filter',
  value: {
    optionName: OptionNameEnum.Filter,
    editor: (options, onChange) => <EnumEdit title={'filter'} option={options.filter} onChange={useCallback(filter => {
      onChange({
        filter
      });
    }, [])} optionEnum={FilterEnum} />
  }
}, {
  name: 'fileFormat',
  value: {
    optionName: OptionNameEnum.FileFormat,
    editor: (options, onChange) => <EnumEdit title={'fileFormat'} option={options.fileFormat} onChange={useCallback(fileFormat => {
      onChange({
        fileFormat
      });
    }, [])} optionEnum={FileFormatEnum} />
  }
}, {
  name: 'gpsInfo',
  value: {
    optionName: OptionNameEnum.GpsInfo,
    editor: (options, onChange) => <GpsInfoEdit onChange={onChange} options={options} hideLabel />
  }
}, {
  name: 'iso',
  value: {
    optionName: OptionNameEnum.Iso,
    editor: (options, onChange) => <EnumEdit title={'iso'} option={options.iso} onChange={useCallback(iso => {
      onChange({
        iso
      });
    }, [])} optionEnum={IsoEnum} />,
    defaultValue: {
      iso: IsoEnum.ISO_AUTO
    }
  }
}, {
  name: 'isoAutoHighLimit',
  value: {
    optionName: OptionNameEnum.IsoAutoHighLimit,
    editor: (options, onChange) => <EnumEdit title={'isoAutoHighLimit'} option={options.isoAutoHighLimit} onChange={useCallback(isoAutoHighLimit => {
      onChange({
        isoAutoHighLimit
      });
    }, [])} optionEnum={IsoAutoHighLimitEnum} />,
    defaultValue: {
      isoAutoHighLimit: IsoAutoHighLimitEnum.ISO_100
    }
  }
}, {
  name: 'latestEnabledExposureDelayTime',
  value: {
    optionName: OptionNameEnum.LatestEnabledExposureDelayTime
  }
}, {
  name: 'maxRecordableTime',
  value: {
    optionName: OptionNameEnum.MaxRecordableTime,
    editor: (options, onChange) => <EnumEdit title={'maxRecordableTime'} option={options.maxRecordableTime} onChange={useCallback(maxRecordableTime => {
      onChange({
        maxRecordableTime
      });
    }, [])} optionEnum={MaxRecordableTimeEnum} />,
    defaultValue: {
      maxRecordableTime: MaxRecordableTimeEnum.RECORDABLE_TIME_1500
    }
  }
}, {
  name: 'offDelay enum',
  value: {
    optionName: OptionNameEnum.OffDelay,
    editor: (options, onChange) => <EnumEdit title={'offDelay'} option={options.offDelay} onChange={useCallback(offDelay => {
      onChange({
        offDelay
      });
    }, [])} optionEnum={OffDelayEnum} />,
    defaultValue: {
      offDelay: OffDelayEnum.DISABLE
    }
  }
}, {
  name: 'offDelay number',
  value: {
    optionName: OptionNameEnum.OffDelay,
    editor: (options, onChange) => <InputNumber title={'offDelay'} onChange={useCallback(newValue => {
      onChange({
        offDelay: newValue
      });
    }, [])} value={typeof options.offDelay === 'string' ? offDelayToSeconds((options.offDelay as OffDelayEnum)) : typeof options.offDelay === 'number' ? options.offDelay : 0} />,
    onWillSet: (options: Options) => {
      if (typeof options.offDelay === 'string') {
        options.offDelay = offDelayToSeconds((options.offDelay as OffDelayEnum));
      }
    }
  }
}, {
  name: 'preset',
  value: {
    optionName: OptionNameEnum.Preset,
    editor: (options, onChange) => <EnumEdit title={'preset'} option={options.preset} onChange={useCallback(preset => {
      onChange({
        preset
      });
    }, [])} optionEnum={PresetEnum} />,
    defaultValue: {
      preset: PresetEnum.FACE
    }
  }
}, {
  name: 'sleepDelay enum',
  value: {
    optionName: OptionNameEnum.SleepDelay,
    editor: (options, onChange) => <EnumEdit title={'sleepDelay'} option={options.sleepDelay} onChange={useCallback(sleepDelay => {
      onChange({
        sleepDelay
      });
    }, [])} optionEnum={SleepDelayEnum} />,
    defaultValue: {
      sleepDelay: SleepDelayEnum.DISABLE
    }
  }
}, {
  name: 'sleepDelay number',
  value: {
    optionName: OptionNameEnum.SleepDelay,
    editor: (options, onChange) => <InputNumber title={'sleepDelay'} onChange={useCallback(newValue => {
      onChange({
        sleepDelay: newValue
      });
    }, [])} value={typeof options.sleepDelay === 'string' ? sleepDelayToSeconds((options.sleepDelay as SleepDelayEnum)) : typeof options.sleepDelay === 'number' ? options.sleepDelay : 0} />,
    onWillSet: (options: Options) => {
      if (typeof options.sleepDelay === 'string') {
        options.sleepDelay = sleepDelayToSeconds((options.sleepDelay as SleepDelayEnum));
      }
    }
  }
}, {
  name: 'timeShift',
  value: {
    optionName: OptionNameEnum.TimeShift,
    editor: (options, onChange) => <TimeShiftEdit onChange={onChange} options={options} />
  }
}, {
  name: 'topBottomCorrection',
  value: {
    optionName: OptionNameEnum.TopBottomCorrection,
    editor: (options, onChange) => <EnumEdit title={'topBottomCorrection'} option={options.topBottomCorrection} onChange={useCallback(topBottomCorrection => {
      onChange({
        topBottomCorrection
      });
    }, [])} optionEnum={TopBottomCorrectionOptionEnum} />,
    defaultValue: {
      topBottomCorrection: TopBottomCorrectionOptionEnum.APPLY_AUTO
    }
  }
}, {
  name: 'videoStitching',
  value: {
    optionName: OptionNameEnum.VideoStitching,
    editor: (options, onChange) => <EnumEdit title={'videoStitching'} option={options.videoStitching} onChange={useCallback(videoStitching => {
      onChange({
        videoStitching
      });
    }, [])} optionEnum={VideoStitchingEnum} />,
    defaultValue: {
      videoStitching: VideoStitchingEnum.NONE
    }
  }
}, {
  name: 'topBottomCorrectionRotation',
  value: {
    optionName: OptionNameEnum.TopBottomCorrectionRotation,
    editor: (options, onChange) => <TopBottomCorrectionRotationEdit onChange={onChange} options={options} />
  }
}, {
  name: 'visibilityReduction',
  value: {
    optionName: OptionNameEnum.VisibilityReduction,
    editor: (options, onChange) => <EnumEdit title={'visibilityReduction'} option={options.visibilityReduction} onChange={useCallback(visibilityReduction => {
      onChange({
        visibilityReduction
      });
    }, [])} optionEnum={VisibilityReductionEnum} />,
    defaultValue: {
      visibilityReduction: VisibilityReductionEnum.OFF
    }
  }
}, {
  name: 'whiteBalance',
  value: {
    optionName: OptionNameEnum.WhiteBalance,
    editor: (options, onChange) => <EnumEdit title={'whiteBalance'} option={options.whiteBalance} onChange={useCallback(whiteBalance => {
      onChange({
        whiteBalance
      });
    }, [])} optionEnum={WhiteBalanceEnum} />,
    defaultValue: {
      whiteBalance: WhiteBalanceEnum.AUTO
    }
  }
}];
const OptionsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'options'>> = ({
  navigation
}) => {
  const [selectedOption, setSelectedOption] = React.useState<OptionItem>();
  const [message, setMessage] = React.useState('');
  const [editOptions, setEditOptions] = React.useState<Options>();
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Options'
    });
  }, [navigation]);
  const onChangeOption = (item: OptionItem) => {
    setMessage('');
    setSelectedOption(item);
    setEditOptions(item.value.defaultValue);
  };
  const onPressGet = useCallback(async () => {
    if (selectedOption == null) {
      return;
    }
    try {
      const options = await getOptions([selectedOption.value.optionName]);
      setMessage(JSON.stringify(options));
      setEditOptions(options);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.name + ': ' + error.message);
      }
      console.log('failed getOptions()');
    }
  }, [options, setMessage, selectedOption, setEditOptions]);
  const onPressSet = useCallback(async () => {
    if (selectedOption == null || editOptions == null) {
      return;
    }
    selectedOption.value.onWillSet?.(editOptions);
    console.log('call setOptions(): ' + JSON.stringify(editOptions));
    try {
      await setOptions(editOptions);
      setMessage('OK.\n' + JSON.stringify(editOptions));
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.name + ': ' + error.message);
      }
      console.log('failed setOptions()');
    }
  }, [setOptions, setMessage, selectedOption, editOptions]);
  return <SafeAreaView style={styles.safeAreaContainer} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.inputArea}>
        <View style={styles.topViewContainer}>
          <View style={styles.rowContainerLayout}>
            <ItemSelectorView style={undefined} title="Option" itemList={optionList} onSelected={useCallback(item => onChangeOption(item), [])} selectedItem={selectedOption} placeHolder="select option" />
            <Button title="Get" onPress={onPressGet} disabled={selectedOption == null} />
          </View>
        </View>
        {selectedOption?.value.editor && <View style={styles.editorContainerLayout}>
            <View style={styles.contentContainer}>
              {selectedOption?.value.editor(editOptions || {}, setEditOptions)}
            </View>
            <Button title="Set" onPress={onPressSet} disabled={editOptions == null} />
          </View>}
      </ScrollView>
      <View style={styles.bottomViewContainer}>
        <ScrollView style={styles.messageArea}>
          <Text style={styles.messageText}>{message}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>;
};
export default OptionsScreen;