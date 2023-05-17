import { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

interface ErrorModalProps {
    isVisible: boolean;
    errorMessage: string | undefined;
    dismiss: () => void;
}

export default function ErrorModal(props: ErrorModalProps): JSX.Element {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={props.isVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 20 }}>Error</Text>
                    <Text>{props.errorMessage}</Text>
                    <Button title="Ok" onPress={props.dismiss}></Button>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
