import { memo } from "react";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screen/menu-screen';
import VideoConvertScreen from './screen/video-convert-screen';
import LivePreviewScreen from './screen/live-preview-screen';
import OptionsScreen from './screen/options-screen/options-screen';
import CommandsScreen from './screen/commands-screen';
import PhotoCaptureScreen from './screen/photo-capture-screen';
import FilePreviewScreen from './screen/file-preview-screen';
import ListFilesScreen from './screen/list-files-screen';
import VideoCaptureScreen from './screen/video-capture-screen/video-capture-screen';
import DeleteFilesScreen from './screen/delete-files-screen/delete-files-screen';
import GetMetadataScreen from './screen/get-metadata-screen/get-metadata-screen';
import GetInfoScreen from './screen/get-info-screen/get-info-screen';
import TimeShiftCaptureScreen from './screen/time-shift-capture-screen/time-shift-capture-screen';
import LimitlessIntervalCaptureScreen from './screen/limitless-interval-capture-screen/limitless-interval-capture-screen';
import ShotCountSpecifiedIntervalCaptureScreen from './screen/shot-count-specified-interval-capture-screen/shot-count-specified-interval-capture-screen';
import CompositeIntervalCaptureScreen from './screen/composite-interval-capture-screen/composite-interval-capture-screen';
import BurstCaptureScreen from './screen/burst-capture-screen/burst-capture-screen';
import ContinuousCaptureScreen from './screen/continuous-capture-screen/continuous-capture-screen';
import MultiBracketCaptureScreen from './screen/multi-bracket-capture-screen/multi-bracket-capture-screen';
import type { FileInfo } from './modules/theta-client';
export type RootStackParamList = {
  menu: undefined;
  getInfo: undefined;
  listFiles: undefined;
  deleteFiles: undefined;
  getMetadata: undefined;
  livePreview: undefined;
  videoConvert: undefined;
  options: undefined;
  commands: undefined;
  photoCapture: undefined;
  videoCapture: undefined;
  limitlessIntervalCapture: undefined;
  timeShiftCapture: undefined;
  shotCountSpecifiedIntervalCapture: undefined;
  compositeIntervalCapture: undefined;
  burstCapture: undefined;
  continuousCapture: undefined;
  multiBracketCapture: undefined;
  filePreview: {
    item: FileInfo;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const screenOptions = ({
  headerStyle: {
    backgroundColor: '#6200ee'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerBackTitle: ''
} as NativeStackNavigationOptions);
const App = memo(() => {
  return <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen options={{
        title: 'Menu'
      }} name="menu" component={MenuScreen} />
        <Stack.Screen options={{
        title: 'Get Info'
      }} name="getInfo" component={GetInfoScreen} />
        <Stack.Screen options={{
        title: 'listFiles'
      }} name="listFiles" component={ListFilesScreen} />
        <Stack.Screen options={{
        title: 'DeleteFiles'
      }} name="deleteFiles" component={DeleteFilesScreen} />
        <Stack.Screen options={{
        title: 'getMetadata'
      }} name="getMetadata" component={GetMetadataScreen} />
        <Stack.Screen options={{
        title: 'Live preview'
      }} name="livePreview" component={LivePreviewScreen} />
        <Stack.Screen options={{
        title: 'VideoConvert'
      }} name="videoConvert" component={VideoConvertScreen} />
        <Stack.Screen options={{
        title: 'Options'
      }} name="options" component={OptionsScreen} />
        <Stack.Screen options={{
        title: 'Commands'
      }} name="commands" component={CommandsScreen} />
        <Stack.Screen options={{
        title: 'Photo Capture'
      }} name="photoCapture" component={PhotoCaptureScreen} />
        <Stack.Screen options={{
        title: 'Video Capture'
      }} name="videoCapture" component={VideoCaptureScreen} />
        <Stack.Screen options={{
        title: 'Limitless Interval Capture'
      }} name="limitlessIntervalCapture" component={LimitlessIntervalCaptureScreen} />
        <Stack.Screen options={{
        title: 'TimeShift Capture'
      }} name="timeShiftCapture" component={TimeShiftCaptureScreen} />
        <Stack.Screen options={{
        title: 'interval shooting with the shot count specified'
      }} name="shotCountSpecifiedIntervalCapture" component={ShotCountSpecifiedIntervalCaptureScreen} />
        <Stack.Screen options={{
        title: 'interval composite shooting'
      }} name="compositeIntervalCapture" component={CompositeIntervalCaptureScreen} />
        <Stack.Screen options={{
        title: 'burst shooting'
      }} name="burstCapture" component={BurstCaptureScreen} />
        <Stack.Screen options={{
        title: 'MultiBracket Capture'
      }} name="multiBracketCapture" component={MultiBracketCaptureScreen} />
        <Stack.Screen options={{
        title: 'continuous shooting'
      }} name="continuousCapture" component={ContinuousCaptureScreen} />
        <Stack.Screen options={{
        title: 'Preview'
      }} name="filePreview" component={FilePreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>;
});
export default App;