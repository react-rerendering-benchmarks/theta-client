import { useCallback } from "react";
import { memo } from "react";
import * as React from 'react';
import type { OptionEditProps } from '..';
import { View, Text } from 'react-native';
import { InputNumber } from '../../ui/input-number';
import styles from './styles';
import Button from '../../ui/button';
import { ApertureEnum, BracketSetting, ExposureCompensationEnum, ExposureProgramEnum, IsoEnum, ShutterSpeedEnum, WhiteBalanceEnum } from '../../../modules/theta-client';
import { EnumEdit } from '../enum-edit';
const EditItem = memo(({
  item,
  onChange
}: {
  item: BracketSetting;
  onChange: (newItem: BracketSetting) => void;
}) => {
  return <View>
      <EnumEdit title={'aperture'} option={item.aperture} onChange={useCallback(aperture => {
      onChange({
        ...item,
        aperture
      });
    }, [])} optionEnum={ApertureEnum} />
      <InputNumber title={'colorTemperature'} onChange={useCallback(value => {
      onChange({
        ...item,
        colorTemperature: value
      });
    }, [])} value={item.colorTemperature} />
      <EnumEdit title={'exposureCompensation'} option={item.exposureCompensation} onChange={useCallback(exposureCompensation => {
      onChange({
        ...item,
        exposureCompensation
      });
    }, [])} optionEnum={ExposureCompensationEnum} />
      <EnumEdit title={'exposureProgram'} option={item.exposureProgram} onChange={useCallback(exposureProgram => {
      onChange({
        ...item,
        exposureProgram
      });
    }, [])} optionEnum={ExposureProgramEnum} />
      <EnumEdit title={'iso'} option={item.iso} onChange={useCallback(iso => {
      onChange({
        ...item,
        iso
      });
    }, [])} optionEnum={IsoEnum} />
      <EnumEdit title={'shutterSpeed'} option={item.shutterSpeed} onChange={useCallback(shutterSpeed => {
      onChange({
        ...item,
        shutterSpeed
      });
    }, [])} optionEnum={ShutterSpeedEnum} />
      <EnumEdit title={'whiteBalance'} option={item.whiteBalance} onChange={useCallback(whiteBalance => {
      onChange({
        ...item,
        whiteBalance
      });
    }, [])} optionEnum={WhiteBalanceEnum} />
    </View>;
});
interface BracketSettingMenuProps {
  item: BracketSetting;
  index: number;
  onChange: (index: number, setting: BracketSetting) => void;
  onRemove: (index: number) => void;
}
const BracketSettingMenu: React.FC<BracketSettingMenuProps> = memo(({
  item,
  index,
  onChange,
  onRemove
}) => {
  return <View key={index}>
      <Text style={styles.itemText}>
        {'Bracket parameters: ' + (index + 1)}
      </Text>
      <View style={styles.removeButtonContainerLayout}>
        <Button style={styles.button} title="Remove setting" onPress={useCallback(() => onRemove(index), [])} />
      </View>
      <EditItem item={item} onChange={useCallback(setting => onChange(index, setting), [])} />
    </View>;
});
export const AutoBracketEdit: React.FC<OptionEditProps> = memo(({
  onChange,
  options
}) => {
  const onChangeSetting = useCallback((index: number, autoBracket: BracketSetting) => {
    const autoBracketList = (options?.autoBracket ?? []).map((item, idx) => idx === index ? autoBracket : item);
    onChange({
      ...options,
      autoBracket: autoBracketList
    });
  }, [options]);
  const onRemoveSetting = useCallback((index: number) => {
    const autoBracketList = [...(options?.autoBracket ?? [])].filter((_, idx) => idx !== index);
    const autoBracket = autoBracketList.length > 0 ? autoBracketList : undefined;
    onChange({
      ...options,
      autoBracket
    });
  }, [options]);
  const onAddSetting = useCallback(() => {
    const newList = [...(options?.autoBracket ?? []), {}];
    onChange({
      ...options,
      autoBracket: newList
    });
  }, [options]);
  return <View style={styles.editorContainerLayout}>
      {options?.autoBracket?.map((item, index) => <BracketSettingMenu item={item} index={index} onChange={onChangeSetting} onRemove={onRemoveSetting} key={index} />) ?? null}
      <View style={styles.addButtonContainerLayout}>
        <Button style={styles.button} title="Add setting" onPress={onAddSetting} />
      </View>
    </View>;
});
AutoBracketEdit.displayName = 'AutoBracketEdit';
export default AutoBracketEdit;