import {
  Button
} from '@/components/ui/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import CustomBox from '../components/CustomBox'
import CustomText from '../components/CustomText'

const signup = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigateToLoginScreen = async () => {
        try {
          const SERVER_BASE_URL = "http://10.0.2.2:8000";
          const response = await fetch(`${SERVER_BASE_URL}/auth/v1/signup`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
              'first_name': firstName,
              'last_name': lastName,
              'email': email,
              'phone_number': phoneNumber,
              'password': password,
              'username': userName
            }),
          });
      
          const data = await response.json();
          console.log(data);
          console.log(data["accessToken"]);
          console.log(data["token"]);
          await AsyncStorage.setItem('accessToken', data["accessToken"]);
          await AsyncStorage.setItem('refreshToken', data["token"]);
      
          router.push('/(main)/home');
        } catch (error) {
          console.error('Error during sign up:', error);
        }
      }
    
  return (
    <View style={styles.signupContainer}>
        <CustomBox style={signUpBox}>
          <CustomText style={styles.heading}>Sign Up</CustomText>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
                <TextInput
            placeholder="User Name"
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            secureTextEntry
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </CustomBox>
        <Button onPressIn={() => {navigateToLoginScreen()}} style={styles.button}>
            <CustomBox style={buttonBox}>
                <CustomText style={{textAlign: 'center'}}>Sign Up</CustomText>
            </CustomBox>
          </Button>
          <Button onPressIn={() => router.push("/(auth)/login")} style={styles.button}>
            <CustomBox style={buttonBox}>
                <CustomText style={{textAlign: 'center'}}>Login</CustomText>
            </CustomBox>
          </Button>
      </View>
  )
};

export default signup

const styles = StyleSheet.create({
    signupContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    button: {
      marginTop: 20,
      width: "30%",
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    textInput: {
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
      color: 'black',
    },
  });
  
  const signUpBox = {
    mainBox: {
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
    },
    shadowBox: {
      backgroundColor: 'gray',
      borderRadius: 10,
    },
  };
  
  const buttonBox = {
    mainBox: {
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      
    },
    shadowBox: {
      backgroundColor: 'gray',
      borderRadius: 10,
    },
  };