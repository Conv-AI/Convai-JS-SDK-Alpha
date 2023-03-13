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
    constructor(sampleRate: number);
    private convertLinearPCMToFloat32;
    private createChunk;
    private addFadeInFadeOut;
    addChunk(data: Uint8Array): void;
}
