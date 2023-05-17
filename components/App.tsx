import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar as SB, Text } from "react-native";

import Loading from "./Loading";
import APODView, { APODResponse } from "./APODView";
import ErrorModal from "./ErrorModal";

export default function App(): JSX.Element {
    const [data, setData] = useState<APODResponse>();
    const [error, setError] = useState<string>();

    let baseUrl: string = "https://api.nasa.gov/planetary/apod";
    let apiKey: string = "U49pcyFPwCOyQpCFTIlJf9SEeJgjIpGhXshmlUmf";

    useEffect(() => {
        getAPOD();
    }, []);

    let getAPOD = (date: Date = new Date()) => {
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();

        let dateString: string = `${year.toString()}-${month
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        fetch(`${baseUrl}?api_key=${apiKey}&date=${dateString}`)
            .then(async (response) => {
                return {
                    status: response.status,
                    json: await response.json(),
                };
            })
            .then((data) => {
                const { status, json } = data;

                if (status == 200) {
                    let apodResponse = new APODResponse(
                        json.copyright || "Public Domain",
                        json.title,
                        json.date,
                        json.explanation,
                        json.media_type,
                        json.url
                    );
                    setData(apodResponse);
                    setError(undefined);
                } else {
                    setError(json.msg);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <>
            <View style={styles.container}>
                {data === undefined ? (
                    <Loading />
                ) : (
                    <>
                        <ErrorModal
                            errorMessage={error}
                            isVisible={error !== undefined}
                            dismiss={() => {
                                // The modal's visibiliy is determined by whether the error message is undefined or not,
                                // so set the error to undefined to dismiss the modal.
                                setError(undefined);
                            }}
                        />
                        <APODView data={data} error={error} getAPOD={getAPOD} />
                    </>
                )}
            </View>
            <StatusBar style="auto" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: SB.currentHeight,
    },
});
