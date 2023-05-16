import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar as SB,
} from "react-native";

class APODResponse {
    copyright: string;
    title: string;
    date: string;
    explanation: string;
    mediaType: string;
    url: string;

    constructor(
        copyright: string,
        title: string,
        date: string,
        explanation: string,
        mediaType: string,
        url: string
    ) {
        this.copyright = copyright;
        this.title = title;
        this.date = date;
        this.explanation = explanation;
        this.mediaType = mediaType;
        this.url = url;
    }
}

export default function App() {
    const [data, setData] = useState<APODResponse>();
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);

    const [error, setError] = useState<string>();

    let apiKey: string = "U49pcyFPwCOyQpCFTIlJf9SEeJgjIpGhXshmlUmf";
    useEffect(() => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                let apodResponse = new APODResponse(
                    data.copyright || "Public Domain",
                    data.title,
                    data.date,
                    data.explanation,
                    data.media_type,
                    data.url
                );

                Image.getSize(data.url, (imgWidth, imgHeight) => {
                    let ratio =
                        (Dimensions.get("window").width -
                            styles.container.marginHorizontal) /
                        imgWidth;

                    setImageWidth(imgWidth * ratio);
                    setImageHeight(imgHeight * ratio);
                });

                setData(apodResponse);
            })
            .catch((error: Error) => setError(error.toString()));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>{error}</Text>
                <Text style={styles.title}>{data?.title}</Text>
                <Text style={styles.subtitle}>
                    {data?.copyright} {"\u2022"} {data?.date}
                </Text>
                <Text>{data?.explanation}</Text>
                <Image
                    source={{ uri: data?.url }}
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SB.currentHeight,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 42,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
    },
});
