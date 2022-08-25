import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Image
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';

export default function App() {
   

    const [imageTab, setImageTab] = useState([]);
            useEffect(() => {
            firebase.storage()
              .ref('https://firebasestorage.googleapis.com/v0/b/msgqrcode.appspot.com/o/rn_image_picker_lib_temp_20868272-378c-4171-bbcc-718d3631d438.jpg?alt=media&token=59b17409-8392-484d-9c29-bc5bef33f505')
              .listAll()
              .then(function(result) {
                  result.items.forEach(function(imageRef) {
                      imageRef.getDownloadURL().then(function(url) {
                          imageTab.push(url);
                          setImageTab(imageTab);
                      }).catch(function(error) {
                          // Handle any errors
                      });
                  });
              })
              .catch((e) => console.log('Errors while downloading => ', e));
          }, []);
      
        
  const [uploading, setUploading] = useState(false);
  const [uploadTask, setUploadTask] = useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
  const [downloadURL, setDownloadURL] = useState();
  const [paused, setPaused] = useState(false);

  const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onMediaSelect);

  const onTakeVideo = () => launchCamera({ mediaType: 'video' }, onMediaSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({ mediaType: 'image' }, onMediaSelect);

  const onSelectVideoPress = () =>
    launchImageLibrary({ mediaType: 'video' }, onMediaSelect);

  const togglePause = () => {
    if (paused) uploadTask.resume();
    else uploadTask.pause();
    setPaused((paused) => !paused);
  };
  
    
 
  

  const onMediaSelect = async (media) => {
    if (!media.didCancel) {
      setUploading(true);
      const reference = storage().ref(media.assets[0].fileName);
      const task = reference.putFile(media.assets[0].uri);
      setUploadTask(task);
      task.on('state_changed', (taskSnapshot) => {
        setUploadTaskSnapshot(taskSnapshot);
      });
      task.then(async () => {
        const downloadURL = await reference.getDownloadURL();
        setDownloadURL(downloadURL);
        setUploading(false);
        setUploadTaskSnapshot({});
      });
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Uploads</Text>
      <View>
       


      
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
       
      </View>
      {uploading && (
        <View style={styles.uploading}>
          {!paused && (
            <ActivityIndicator size={60} color="#47477b"></ActivityIndicator>
          )}
          <Text style={styles.statusText}>
            {!paused ? 'Uploading' : 'Paused'}
          </Text>
          <Text style={styles.statusText}>
            {`${(
              (uploadTaskSnapshot.bytesTransferred /
                uploadTaskSnapshot.totalBytes) *
              100
            ).toFixed(2)}% / 100%`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={togglePause}>
            <Text style={styles.buttonText}>{paused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>
        </View>
      )}
      {downloadURL && (
        <TouchableOpacity
          style={[styles.button, styles.mediaButton]}
          onPress={() => Linking.openURL(downloadURL)}>
          <Text style={styles.buttonText}>View Media</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity  onPress={()=>Linking.openURL(downloadURL)}>
        <Text style={styles.buttonText}>View Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
    color:'black'
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  mediaButton: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    width: 300,
  },
  uploading: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 20,
    fontSize: 20,
    color:'black'
  },
});