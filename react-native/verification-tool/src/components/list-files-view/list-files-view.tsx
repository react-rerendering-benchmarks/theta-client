import { useRef } from "react";
import { memo } from "react";
import React from 'react';
import { type ViewProps, type ViewStyle, StyleProp, TouchableOpacity, Text, View, ScrollView, RefreshControl } from 'react-native';
import styles from './styles';
import { FileInfo, FileTypeEnum, StorageEnum, ThetaFiles, listFiles } from '../../modules/theta-client';
interface Props extends Pick<ViewProps, 'testID'> {
  style?: StyleProp<ViewStyle>;
  selectedFiles?: FileInfo[];
  onSelected?: (files: FileInfo[]) => void;
  fileType?: FileTypeEnum;
  startPosition?: number;
  entryCount?: number;
  storage?: StorageEnum;
  multiselect?: boolean;
  onError?: (error: any) => void;
  refreshCounter?: number;
  onRefreshed?: (thetaFiles?: ThetaFiles) => void;
}
export const ListFilesView: React.FC<Props> = memo(({
  onSelected,
  selectedFiles,
  fileType,
  startPosition,
  entryCount,
  storage,
  multiselect,
  onError,
  refreshCounter,
  onRefreshed
}) => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const thetaFiles = React.useState<ThetaFiles>();
  const selected = React.useState<FileInfo[]>(selectedFiles ?? []);
  React.useEffect(() => {
    selected.current = selectedFiles ?? [];
  }, [selectedFiles]);
  const getFileList = React.useCallback(async () => {
    try {
      if (entryCount != null && entryCount < 0) {
        return undefined;
      }
      const result = await listFiles(fileType ?? FileTypeEnum.ALL, startPosition, entryCount ?? 100, storage);
      return result;
    } catch (error) {
      console.log('listFiles error: ' + JSON.stringify(error));
      onError?.(error);
      return undefined;
    }
  }, [entryCount, fileType, onError, startPosition, storage]);
  const onPressItem = (item: FileInfo) => {
    let items: FileInfo[] = [];
    if (multiselect) {
      const findFile = selected.current.find(element => {
        return element.fileUrl === item.fileUrl;
      });
      if (findFile == null) {
        items = [...selected.current, item];
      } else {
        items = selected.current.filter(element => {
          return element.fileUrl !== item.fileUrl;
        });
      }
    } else {
      items = [item];
    }
    selected.current = items;
    onSelected?.(items);
  };
  const isSelectedFile = (fileInfo: FileInfo) => {
    const foundItem = selected.current.find(item => {
      return item.fileUrl === fileInfo.fileUrl;
    });
    if (foundItem == null) {
      return false;
    }
    return true;
  };
  const onRefresh = React.useCallback(async () => {
    console.log('ListFilesView onRefresh');
    selected.current = [];
    setRefreshing(true);
    const resultListFiles = await getFileList();
    thetaFiles.current = resultListFiles;
    setRefreshing(false);
    onRefreshed?.(resultListFiles);
  }, [getFileList, onRefreshed]);
  React.useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPosition, entryCount, fileType, storage, refreshCounter]);
  const items = thetaFiles.current?.fileList.map(item => <TouchableOpacity style={isSelectedFile(item) ? styles.listItemBaseSelected : styles.listItemBase} key={item.name} onPress={() => onPressItem(item)}>
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>) ?? [];
  return <View style={styles.container}>
      <ScrollView style={styles.listContentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {items}
      </ScrollView>
    </View>;
});
export default ListFilesView;