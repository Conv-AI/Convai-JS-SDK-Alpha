export declare class AudioPlayer {
    private audioContext;
    private gainNode;
    private chunks;
    private sampleRate;
    private startTime;
    private lastChunkOffset;
    private fadeDuration;
    private minVol;
    private maxVol;
    private onPlay;
    private onStop;
    private isPlaying;
    constructor(sampleRate: number);
    private convertLinearPCMToFloat32;
    private createChunk;
    private addFadeInFadeOut;
    addChunk(data: Uint8Array): void;
    onPlayStart(fn: () => void): void;
    onPlayStop(fn: () => void): void;
}
