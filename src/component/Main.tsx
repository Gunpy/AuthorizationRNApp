import React, {useEffect, useState} from 'react';
import {TextInput, View, TouchableOpacity, Text, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styles'
import {Actions} from "react-native-router-flux";
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    webClientId: "38750267377-7bdo10ldde31spm8o26idin7cs8pfjha.apps.googleusercontent.com",
});


export interface getFromApi {
    duration: number,
    token: string,
}

interface inputData {
    password: number,
    email: string,
}


const Main = () => {
    const [state, setState] = useState<getFromApi>({duration: 0, token: ''});
    const [data, setData] = useState<inputData>({email: '', password: 0});
    const [error, setError] = useState('');

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('@token')
            if (token !== null) {
                Actions.inLogin();
            }
        }
        getToken();
    }, [])
    const getApi = async () => {
        try {
            const url: any = await fetch('https://site.ualegion.com/api/v1/security/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            const user: any = await url.json();
            if (user.message) {
                setError(user.message)
            }
            if (user.token) {
                setState(prev => ({
                    ...prev,
                    token: user.token
                }));
                await AsyncStorage.setItem('@token', JSON.stringify(user.token))
                setError('')
                Actions.inLogin()
            }
        } catch (err) {
            throw new Error(`Auth Wrong ${err}`)
        }
    }
    const handleChangeEmail = (number: string) => {
        //@ts-ignore
        if (!isNaN(number)) {
            setData(prevState => ({
                ...prevState,
                password: +number,
            }))
            setError('');
        }
    }
    const handleChangePassword = (text: string) => {
        setData(prevState => ({
            ...prevState,
            email: text,
        }))
        setError('');
    }

    async function onFacebookButtonPress() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        return auth().signInWithCredential(facebookCredential);
    }

    const handleFacebookLogin = () => {
        onFacebookButtonPress().then(res => {
            if (res.user.uid) {
                AsyncStorage.setItem('@token', JSON.stringify(res.user.uid))
                Actions.inLogin()
            }
        }).catch(error => {
            throw new Error(`Error Auth from Facebook ${error}`)
        })
    }

    async function onGoogleButtonPress() {
        try{
        console.log('Work')
        const { idToken } = await GoogleSignin.signIn();
        console.log('NotWork')
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
        }catch(error) {
            console.log(error)
        }
    }

    const handleGoogleLogin = () => {
        onGoogleButtonPress().then(res => {
            // @ts-ignore
            if (res.user.uid) {
                // @ts-ignore
                AsyncStorage.setItem('@token', JSON.stringify(res.user.uid))
                Actions.inLogin()
            }
            console.log('res google',res)
        }).catch(error => {
            throw new Error(`Error Auth from Google ${error}`)
        })
    }

    return (

        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome in my App</Text>
            <View style={styles.social}>
                <TouchableOpacity onPress={handleFacebookLogin}>
                    <Image style={styles.imageSocial}
                           source={require('../assets/authFacebook.png')}/>
                </TouchableOpacity>
                <TouchableOpacity   onPress={handleGoogleLogin}>
                    <Image style={styles.imageSocial}
                           source={require('../assets/authGoogle.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input}
                           placeholder="Email"
                           autoCapitalize="none"
                           value={data.email}
                           onChangeText={(text) => handleChangePassword(text)}
                />
                <Text style={styles.text}>PIN</Text>
                <TextInput style={styles.input}
                           placeholder="PIN"
                           autoCapitalize="none"
                           value={data.password !== 0 ? '' + data.password : ''}
                    //@ts-ignore
                           onChangeText={(number) => handleChangeEmail(number)}
                />
                <TouchableOpacity>
                    <Text style={{
                        color: 'black',
                        fontSize: 16,
                        marginLeft: 20,
                        opacity: 0.7,
                    }}>Forgot Password ?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={getApi}>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                {!!error && <Text style={styles.errorText}>* {error}</Text>}
            </View>
        </View>
    )
}

export default Main

