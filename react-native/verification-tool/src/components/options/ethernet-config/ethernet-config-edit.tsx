import { useCallback } from "react";
import * as React from 'react';
import type { OptionEditProps } from '..';
import { View, Text } from 'react-native';
import { InputString } from '../../ui/input-string';
import { InputNumber } from '../../ui/input-number';
import { TitledSwitch } from '../../ui/titled-switch';
import styles from './styles';
export const EthernetConfigEdit: React.FC<OptionEditProps> = ({
  onChange,
  options
}) => {
  return <View>
      <TitledSwitch title="usingDhcp" value={options?.ethernetConfig?.usingDhcp} onChange={useCallback(newValue => {
      const newOptions = {
        ...options,
        ethernetConfig: {
          ...options?.ethernetConfig,
          usingDhcp: newValue
        }
      };
      onChange(newOptions);
    }, [options])} />
      <InputString title={'ipAddress'} onChange={useCallback(newValue => {
      const newOptions = {
        ...options,
        ethernetConfig: {
          ...options?.ethernetConfig,
          ipAddress: newValue
        }
      };
      onChange(newOptions);
    }, [options])} value={options?.ethernetConfig?.ipAddress} />
      <InputString title={'subnetMask'} onChange={useCallback(newValue => {
      const newOptions = {
        ...options,
        ethernetConfig: {
          ...options?.ethernetConfig,
          subnetMask: newValue
        }
      };
      onChange(newOptions);
    }, [options])} value={options?.ethernetConfig?.subnetMask} />
      <InputString title={'defaultGateway'} onChange={useCallback(newValue => {
      const newOptions = {
        ...options,
        ethernetConfig: {
          ...options?.ethernetConfig,
          defaultGateway: newValue
        }
      };
      onChange(newOptions);
    }, [options])} value={options?.ethernetConfig?.defaultGateway} />
      <View style={styles.rowContainerLayout}>
        <Text style={styles.labelText}>proxy</Text>
        <View style={styles.colContainerLayout}>
          <TitledSwitch title="use" value={options?.ethernetConfig?.proxy?.use} onChange={useCallback(newValue => {
          const newOptions = {
            ...options,
            ethernetConfig: {
              ...options?.ethernetConfig,
              proxy: {
                ...options?.ethernetConfig?.proxy,
                use: newValue
              }
            }
          };
          onChange(newOptions);
        }, [options])} />
          {options?.ethernetConfig?.proxy?.use && <View>
              <InputString title={'url'} onChange={useCallback(newValue => {
            const use = options?.ethernetConfig?.proxy?.use;
            if (use !== undefined) {
              const newOptions = {
                ...options,
                ethernetConfig: {
                  ...options?.ethernetConfig,
                  proxy: {
                    ...options?.ethernetConfig?.proxy,
                    use: use,
                    url: newValue
                  }
                }
              };
              onChange(newOptions);
            }
          }, [options])} value={options?.ethernetConfig?.proxy?.url} />
              <InputNumber title={'port'} onChange={useCallback(newValue => {
            const use = options?.ethernetConfig?.proxy?.use;
            if (use !== undefined) {
              const newOptions = {
                ...options,
                ethernetConfig: {
                  ...options?.ethernetConfig,
                  proxy: {
                    ...options?.ethernetConfig?.proxy,
                    use: use,
                    port: newValue
                  }
                }
              };
              onChange(newOptions);
            }
          }, [options])} value={options?.ethernetConfig?.proxy?.port} />
              <InputString title={'userid'} onChange={useCallback(newValue => {
            const use = options?.ethernetConfig?.proxy?.use;
            if (use !== undefined) {
              const newOptions = {
                ...options,
                ethernetConfig: {
                  ...options?.ethernetConfig,
                  proxy: {
                    ...options?.ethernetConfig?.proxy,
                    use: use,
                    userid: newValue
                  }
                }
              };
              onChange(newOptions);
            }
          }, [options])} value={options?.ethernetConfig?.proxy?.userid} />
              <InputString title={'password'} onChange={useCallback(newValue => {
            const use = options?.ethernetConfig?.proxy?.use;
            if (use !== undefined) {
              const newOptions = {
                ...options,
                ethernetConfig: {
                  ...options?.ethernetConfig,
                  proxy: {
                    ...options?.ethernetConfig?.proxy,
                    use: use,
                    password: newValue
                  }
                }
              };
              onChange(newOptions);
            }
          }, [options])} value={options?.ethernetConfig?.proxy?.password} />
            </View>}
        </View>
      </View>
    </View>;
};
EthernetConfigEdit.displayName = 'EthernetConfigEdit';
export default EthernetConfigEdit;