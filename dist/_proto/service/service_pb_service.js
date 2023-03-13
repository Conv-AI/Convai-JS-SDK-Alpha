// package: service
// file: service/service.proto

var service_service_pb = require("../service/service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ConvaiService = (function () {
  function ConvaiService() {}
  ConvaiService.serviceName = "service.ConvaiService";
  return ConvaiService;
}());

ConvaiService.Hello = {
  methodName: "Hello",
  service: ConvaiService,
  requestStream: false,
  responseStream: false,
  requestType: service_service_pb.HelloRequest,
  responseType: service_service_pb.HelloResponse
};

ConvaiService.HelloStream = {
  methodName: "HelloStream",
  service: ConvaiService,
  requestStream: true,
  responseStream: true,
  requestType: service_service_pb.HelloRequest,
  responseType: service_service_pb.HelloResponse
};

ConvaiService.SpeechToText = {
  methodName: "SpeechToText",
  service: ConvaiService,
  requestStream: true,
  responseStream: true,
  requestType: service_service_pb.STTRequest,
  responseType: service_service_pb.STTResponse
};

ConvaiService.GetResponse = {
  methodName: "GetResponse",
  service: ConvaiService,
  requestStream: true,
  responseStream: true,
  requestType: service_service_pb.GetResponseRequest,
  responseType: service_service_pb.GetResponseResponse
};

ConvaiService.GetResponseSingle = {
  methodName: "GetResponseSingle",
  service: ConvaiService,
  requestStream: false,
  responseStream: true,
  requestType: service_service_pb.GetResponseRequestSingle,
  responseType: service_service_pb.GetResponseResponse
};

exports.ConvaiService = ConvaiService;

function ConvaiServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ConvaiServiceClient.prototype.hello = function hello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ConvaiService.Hello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ConvaiServiceClient.prototype.helloStream = function helloStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(ConvaiService.HelloStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ConvaiServiceClient.prototype.speechToText = function speechToText(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(ConvaiService.SpeechToText, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ConvaiServiceClient.prototype.getResponse = function getResponse(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(ConvaiService.GetResponse, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ConvaiServiceClient.prototype.getResponseSingle = function getResponseSingle(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ConvaiService.GetResponseSingle, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ConvaiServiceClient = ConvaiServiceClient;

