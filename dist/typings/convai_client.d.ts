import { GetResponseResponse } from "../_proto/service/service_pb";
export interface ConvaiClientParams {
    apiKey: string;
    characterId: string;
    enableAudio: boolean;
    languageCode?: string;
}
export declare class ConvaiClient {
    private sessionId;
    private responseCallback;
    private apiKey;
    private characterId;
    private languageCode;
    private enableAudio;
    private audioRecorder;
    private audioPlayer;
    private convaiGrpcClient;
    constructor(params: ConvaiClientParams);
    private validateBeforeRequest;
    resetSession(): void;
    setResponseCallback(fn: (response: GetResponseResponse) => void): void;
    sendTextChunk(text: string): void;
    startAudioChunk(): void;
    endAudioChunk(): void;
    onAudioPlay(fn: () => void): void;
    onAudioStop(fn: () => void): void;
}
