### This repository is not being maintained anymore. Please refer [ https://github.com/Conv-AI/Convai-Web-SDK-Interna](https://github.com/Conv-AI/Convai-Web-SDK) for updated code. This repository will be deprecated soon.

# Convai-Web-SDK: Interact with your favorite characters from the web browser

### Get started

Following examples use typescript bindings.

```ts
import { ConvaiClient } from 'convai-web-sdk';
import { GetResponseResponse } from "convai-web-sdk/dist/_proto/service/service_pb";

// Initiate the convai client.
var convaiClient = new ConvaiClient({
    apiKey: <add convai api key>,
    characterId: <add convai character id>,
    enableAudio: true // use false for text only.
});

// Set a response callback. This may fire multiple times as response
// can come in multiple parts.
convaiClient.setResponseCallback((response: GetResponseResponse) => {
    // live transcript, only available during audio mode.
    if (response.hasUserQuery()) {
        var transcript = response!.getUserQuery();
        var isFinal = response!.getIsFinal();
    }
    if (response.hasAudioResponse()) {
        var audioResponse = response?.getAudioResponse();
        if (audioResponse.hasTextData()) {
            // Response text.
            console.log(audioResponse?.getTextData());
        }
        if (audioResponse.hasAudioData()) {
            // Play or process audio response.
            var audioByteArray: UInt8Array = audioResponse!.getAudioData_asU8();
        }
    }

    // Actions coming soon!
});

// Send text input
var text = "How are you?";
convaiClient.sendTextChunk(text);

// Send audio chunks.
// Starts audio recording using default microphone.
convaiClient.startAudioChunk();

// Stop recording and finish submitting input.
convaiClient.endAudioChunk();

// End or Reset a conversation session.
convaiClient.resetSession();

```

### Sample Chat React Application

Open the terminal from the project root.

```sh
cd demo/chat
# Install all dependencies
npm install
# Install the convai-web-sdk plugin present in the root folder.
npm install ../..
# Add Convai API Key and Character ID in src/constants.ts
vim src/constants.ts
# Run app on localhost
npm run start
# App will start at http://localhost:8081.
```

### Sample Interactive Avatar Application using ThreeJS

Open the terminal from the project root.

```sh
cd demo/talking-avatar
# Install all dependencies
npm install
# Add Convai API Key and Character ID in src/constants.ts
vim src/constants.js
# Run app on localhost
npm run start
# App will start at http://localhost:3000.
```


https://user-images.githubusercontent.com/1998396/229350106-e9c8897f-9eee-4add-a833-17f6210f3c05.mov



