
import {
  Button
} from '@/components/ui/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import LoginService from '../(api)/LoginService'
import CustomBox from '../components/CustomBox'
import CustomText from '../components/CustomText'

const login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const[loggedIn,setLoggedIn] = useState(false);
  const loginService = new LoginService();

  const isLoggedIn = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await fetch('http://10.0.2.2:8000/ping', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.ok;
  }

  const refreshToken = async() => {
    const SERVER_BASE_URL = "http://10.0.2.2:8000";
    console.log('Inside refresh token');
    const refreshtoken = await AsyncStorage.getItem('refreshToken');
    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/refreshToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'

      },
      body: JSON.stringify({
        token:refreshToken,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('accessToken',data['accessToken']);
      await AsyncStorage.setItem('refreshToken',data['token']);
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(
        'Tokens after refresh are ' + refreshToken + ' ' + accessToken,

      );
    }
    return response.ok;
  }

  const gotoHomePageWithLogin = async () => {
    const SERVER_BASE_URL = "http://10.0.2.2:8000";
    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/refreshToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('accessToken', data['accessToken']);
      await AsyncStorage.setItem('refreshToken', data['token']);
      router.push('/(main)/home');
    }
  };



  useEffect(() => {
    const handleLogin = async () => {
      const loggedIn = await isLoggedIn();
      setLoggedIn(loggedIn);
      if (loggedIn) {
        router.push('/(main)/home');
      } else {
        const refreshed = await refreshToken();
        setLoggedIn(refreshed);
        if (refreshed) {
          router.push('/(main)/home');
        }
      }
    };
    handleLogin();
  }, []);
  
  return (
    <View style={styles.loginContainer}>
      <CustomBox style={loginBox}>
        <CustomText style={styles.heading}>Login</CustomText>
        <TextInput
          placeholder='User name'
          value={userName}
          onChangeText={text => setUserName(text)}
          style={styles.textInput}
          placeholderTextColor="#888"

         />
        <TextInput
         placeholder="Password"
         value={password}
         onChangeText={text => setPassword(text)}
         style={styles.textInput}
         placeholderTextColor="#888"
         secureTextEntry
        />
    </CustomBox>
    <Button onPressIn={() => gotoHomePageWithLogin()} style={styles.button}>
          <CustomBox style={buttonBox}>
            <CustomText style={{textAlign: 'center'}}>Submit</CustomText>
          </CustomBox>
        </Button>
        <Button onPressIn={() => router.push("/(auth)/signup")} style={styles.button}>
          <CustomBox style={buttonBox}>
            <CustomText style={{textAlign: 'center'}}>Goto Signup</CustomText>
          </CustomBox>
        </Button>
    </View>
  );
};

export default login

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
    width: '30%',
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

const loginBox = {
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