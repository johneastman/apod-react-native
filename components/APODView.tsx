import { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
} from "react-native";

export class APODResponse {
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

interface APODViewProps {
    data: APODResponse;
    error: string;
}

export default function APODView(props: APODViewProps): JSX.Element {
    let { data, error } = props;

    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);

    Image.getSize(data.url, (imgWidth, imgHeight) => {
        // Desired width of image is screen width minus 2 horizontal-padding widths to account for padding on both
        // left and right sides of screen.
        let width: number =
            Dimensions.get("window").width -
            styles.container.marginHorizontal * 2;
        let ratio = width / imgWidth;

        setImageWidth(imgWidth * ratio);
        setImageHeight(imgHeight * ratio);
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{error}</Text>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subtitle}>
                    {data.copyright} {"\u2022"} {data.date}
                </Text>
                <Image
                    source={{ uri: data.url }}
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />
                <Text>{data.explanation}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
