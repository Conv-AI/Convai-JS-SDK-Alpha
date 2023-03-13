export declare class AudioRecorder {
    private mediaRecorder;
    private audioChunks;
    private userMedia;
    private isRecording;
    constructor();
    init(audioCallback: (buffer: ArrayBuffer) => void): void;
    start(timeslice?: number): void;
    stop(): void;
    private addAudioChunkCallback;
}
