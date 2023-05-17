import { Image } from "react-native";
import { useState } from "react";

interface CustomImageProps {
    url: string;
    width: number;
}

export default function CustomImage(props: CustomImageProps): JSX.Element {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    Image.getSize(props.url, (imgWidth, imgHeight) => {
        // Desired width of image is screen width minus 2 horizontal-padding widths to account for padding on both
        // left and right sides of screen.
        let ratio = props.width / imgWidth;

        setWidth(imgWidth * ratio);
        setHeight(imgHeight * ratio);
    });

    return (
        <Image
            source={{ uri: props.url }}
            style={{
                width: width,
                height: height,
            }}
        />
    );
}
