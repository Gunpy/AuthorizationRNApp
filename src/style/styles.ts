import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '80%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    formContainer: {
        width: '100%',
    },
    input: {
        width: '90%',
        margin: 15,
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: '#000000',
        fontSize: 17
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 20,
        width: '50%',
        alignSelf: "flex-start"
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600'
    },
    text: {
        fontSize: 17,
        marginLeft: 20,
    }
})

export default styles