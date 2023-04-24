export declare class AudioPlayer {
    private sampleRate;
    private asyncQueue;
    private audio;
    private url;
    private onPlay;
    private onStop;
    private isPlaying;
    constructor(sampleRate: number);
    private arrayBufferToBase64;
    addChunk(data: Uint8Array, sampleRate?: number | null): void;
    onPlayStart(fn: () => void): void;
    onPlayStop(fn: () => void): void;
}
