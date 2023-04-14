import { GetResponseResponse } from "../_proto/service/service_pb";
export declare class ConvaiGRPCClient {
    private client;
    private apiKey;
    private languageCode;
    private sessionId;
    private characterId;
    private inputMode;
    private isStarted;
    constructor(apiKey: string, characterId: string, sessionId: string, responseCallback: (response: GetResponseResponse) => void, languageCode: string);
    sendText(text: string): void;
    sendAudioChunk(chunk: ArrayBuffer): void;
    finishSend(): void;
    private start;
}
