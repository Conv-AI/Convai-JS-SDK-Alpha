// package: service
// file: service/service.proto

import * as service_service_pb from "../service/service_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ConvaiServiceHello = {
  readonly methodName: string;
  readonly service: typeof ConvaiService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof service_service_pb.HelloRequest;
  readonly responseType: typeof service_service_pb.HelloResponse;
};

type ConvaiServiceHelloStream = {
  readonly methodName: string;
  readonly service: typeof ConvaiService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof service_service_pb.HelloRequest;
  readonly responseType: typeof service_service_pb.HelloResponse;
};

type ConvaiServiceSpeechToText = {
  readonly methodName: string;
  readonly service: typeof ConvaiService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof service_service_pb.STTRequest;
  readonly responseType: typeof service_service_pb.STTResponse;
};

type ConvaiServiceGetResponse = {
  readonly methodName: string;
  readonly service: typeof ConvaiService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof service_service_pb.GetResponseRequest;
  readonly responseType: typeof service_service_pb.GetResponseResponse;
};

type ConvaiServiceGetResponseSingle = {
  readonly methodName: string;
  readonly service: typeof ConvaiService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof service_service_pb.GetResponseRequestSingle;
  readonly responseType: typeof service_service_pb.GetResponseResponse;
};

export class ConvaiService {
  static readonly serviceName: string;
  static readonly Hello: ConvaiServiceHello;
  static readonly HelloStream: ConvaiServiceHelloStream;
  static readonly SpeechToText: ConvaiServiceSpeechToText;
  static readonly GetResponse: ConvaiServiceGetResponse;
  static readonly GetResponseSingle: ConvaiServiceGetResponseSingle;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ConvaiServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  hello(
    requestMessage: service_service_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: service_service_pb.HelloResponse|null) => void
  ): UnaryResponse;
  hello(
    requestMessage: service_service_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: service_service_pb.HelloResponse|null) => void
  ): UnaryResponse;
  helloStream(metadata?: grpc.Metadata): BidirectionalStream<service_service_pb.HelloRequest, service_service_pb.HelloResponse>;
  speechToText(metadata?: grpc.Metadata): BidirectionalStream<service_service_pb.STTRequest, service_service_pb.STTResponse>;
  getResponse(metadata?: grpc.Metadata): BidirectionalStream<service_service_pb.GetResponseRequest, service_service_pb.GetResponseResponse>;
  getResponseSingle(requestMessage: service_service_pb.GetResponseRequestSingle, metadata?: grpc.Metadata): ResponseStream<service_service_pb.GetResponseResponse>;
}

