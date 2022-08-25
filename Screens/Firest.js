import { View, Text , TextInput,ScrollView,TouchableOpacity, StyleSheet} from 'react-native'
import React, {useState, useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import { async } from '@firebase/util';
import { QuerySnapshot } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const Firest = () => {
    const [text, setText]=useState('');
    const [list, setList]=useState('');
    useEffect(()=>{
        return ref.onSnapshot(querySnapshot=>{
            const list=[];
            querySnapshot.forEach(doc=>{
                list.push({
                    id:doc.data().id,
                    title:doc.data().title
                })
            })
            setList(list);
        })
    })
    const ref = firestore().collection('users');
    const onSubmitPress=async()=>{
        
        if(text.length===0)
        {
           alert("add text")
        }
        await ref.add({
            title:text,
        })
        setText('')
    }
  return (
    <ScrollView>
     <TextInput
     value={text}
     style={{borderColor:'black', width:300, backgroundColor:'red',borderColor:'green'}}
     onChangeText={setText}></TextInput>
    <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
     <FlatList data={list} renderItem={({item})=>(
       <View>
         <Text style={{textAlign:'center'}}>{item.title}</Text>
       </View>
  )}
/>     

     
    </ScrollView>
  )
}

export default Firest
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
      width:300, marginLeft:50
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