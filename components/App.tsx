import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import Loading from "./Loading";
import APODView, { APODResponse } from "./APODView";

export default function App(): JSX.Element {
    const [data, setData] = useState<APODResponse>();
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
                setData(apodResponse);
            })
            .catch((error: Error) => setError(error.toString()));
    }, []);

    return (
        <>
            {data === undefined ? (
                <Loading />
            ) : (
                <APODView data={data} error={error || ""} />
            )}
            <StatusBar style="auto" />
        </>
    );
}
