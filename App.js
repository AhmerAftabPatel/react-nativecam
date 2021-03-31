import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'red'}}>loading...</Text>
      </View>
    </>
  );
};

const App = () => {
  const [image, setImage] = useState(null);
  const takePicture = async camera => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      {image ? (
        <>
          <View style={styles.preview}>
            <Text style={styles.camtext}>Here is your profile picture</Text>
            <Image
              style={styles.click}
              source={{uri: image, width: '100%', height: '50%'}}
            />
            <Text style={styles.picText}>Profile Picture</Text>
          </View>
          <Button title={'Click again'} onPress={() => setImage(null)}></Button>
        </>
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to use camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'longer text to use audio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  bottom: '10%',
                  top: '70%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={() => takePicture(camera)}>
                  <Text>Snap</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
        // <Text>Image is not present</Text>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0A79DF',
  },
  preview: {
    flex: 1,
    // justifyContent: 'space-around',
  },
  capture: {
    flex: 0,
    backgroundColor : "transparent",
    padding: 20,
    borderRadius : 160,
    borderWidth : 4,
    borderColor : "#3498DB"
  },
  camtext: {
    backgroundColor: '#3498DB',
    color: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },
  click: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignSelf : "center",
    margin : 5,
    borderColor : "#FFF",
    borderWidth : 2
  },
  picText: {
    textAlign: 'center',
    fontSize: 30,
    textDecorationStyle: 'dotted',
    color: '#FFFFFF',
    marginTop: 0,
    textDecorationLine : "underline"
  },
  buttonSave: {
    textAlign: 'center',
    borderRadius: 150,
    height: 80,
    width: 80,
    backgroundColor: '#009900',
  },
});
