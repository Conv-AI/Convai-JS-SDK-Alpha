import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ConvaiClient } from 'convai-web-sdk';
import { GetResponseResponse } from "convai-web-sdk/dist/_proto/service/service_pb";
import "./app.scss";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  InputToolbox,
  Button,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons/faMicrophoneSlash";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { SETTINGS } from "./constants";

type ChatMessage = {
  speaker: string,
  msg: string
}
type Chat = {
  userMsg: string,
  messages: Array<ChatMessage>,
}

class App extends React.Component<{}, Chat> {
  private client: ConvaiClient;
  private talkMsg = "Talk";
  constructor(props: any) {
    super(props);
    this.state = {
      userMsg: "",
      messages: [],
    }
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.talky = this.talky.bind(this);
    this.reset = this.reset.bind(this);
    this.client = new ConvaiClient({
      apiKey: SETTINGS.get("CONVAI-API-KEY") as string,
      characterId: SETTINGS.get("CHARACTER-ID") as string,
      enableAudio: true
    });
  }
  reset(event: any) {
    event.preventDefault();
    this.client.resetSession();
    this.setState({
      userMsg: "",
      messages: []
    });
  }
  handleMsgChange(msg: any) {
    var messages = this.state.messages;
    this.setState({ userMsg: msg, messages: messages });
  }
  talky(event: any) {
    event.preventDefault();
    var messages = this.state.messages;
    var userMsg = this.state.userMsg;
    if (this.talkMsg == "Talk") {
      this.talkMsg = "Stop Talking";
      this.setState({ userMsg: userMsg, messages: messages });
      var responseText = "";
      var finalUserText = "";
      var tempUserText = "";
      var newMessages = this.state.messages;
      newMessages.push({ speaker: "Me", msg: "..." });
      this.setState({
        userMsg: "",
        messages: newMessages,
      });

      this.client.setResponseCallback((response: GetResponseResponse) => {
        if (response.hasUserQuery()) {
          var userQuery = response!.getUserQuery();
          var textData = userQuery?.getTextData();
          var newMessages = this.state.messages;
          if (textData != "") {
            if (userQuery?.getTextData)
              if (userQuery?.getIsFinal()) {
                finalUserText += userQuery.getTextData();
                tempUserText = "";
              } else {
                tempUserText = userQuery!.getTextData();
              }
            newMessages.pop();
            newMessages.push({ speaker: "Me", msg: finalUserText + tempUserText });
          }
          if (userQuery?.getEndOfResponse()) {
            newMessages.push({ speaker: "NPC", msg: "..." });
          }
          this.setState({
            userMsg: "",
            messages: newMessages,
          });
        }
        if (response.hasAudioResponse()) {
          var newMessages = this.state.messages;
          newMessages.pop();
          responseText += response?.getAudioResponse()?.getTextData();
          newMessages.push({ speaker: "NPC", msg: responseText });
          this.setState({
            userMsg: "",
            messages: newMessages,
          });
        }
      });
      this.client.startAudioChunk();
    } else {
      this.talkMsg = "Talk";
      this.client.endAudioChunk();
      this.setState({ userMsg: userMsg, messages: messages });
    }
  }
  sendMsg(e: any) {
    console.log(e);
    var userMsg = this.state.userMsg;
    var responseText = "";
    var newMessages = this.state.messages;
    newMessages.push({ speaker: "Me", msg: userMsg });
    newMessages.push({ speaker: "NPC", msg: "..." });
    this.setState({
      userMsg: "",
      messages: newMessages
    });

    this.client.setResponseCallback((response: GetResponseResponse) => {
      if (response.hasAudioResponse()) {
        var newMessages = this.state.messages;
        newMessages.pop();
        responseText += response?.getAudioResponse()?.getTextData();
        newMessages.push({ speaker: "NPC", msg: responseText });
        this.setState({
          userMsg: "",
          messages: newMessages
        });
      }
    });
    this.client.sendTextChunk(userMsg);
  }

  render() {
    return (
      <div style={{ position: "relative", margin: "auto", height: "500px", width: "50%" }}>
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Content userName="CONVAI-CHAT" />
              <ConversationHeader.Actions>
                <Button onClick={this.reset}>Reset</Button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              {this.state.messages.map(function (msg: ChatMessage, index: number) {
                return <Message
                  model={{
                    message: msg.msg,
                    sender: msg.speaker,
                    direction: msg.speaker == "Me" ? "outgoing" : "incoming",
                    position: "normal",
                  }} key={index}
                />

              })}
            </MessageList>
          </ChatContainer>
        </MainContainer>
        <div className='cs-message-input'>
          <InputToolbox>
            <Button onClick={this.talky} icon={<FontAwesomeIcon icon={this.talkMsg == "Talk" ? faMicrophoneSlash : faMicrophone} />}></Button>
          </InputToolbox>
          <MessageInput value={this.state.userMsg} onChange={this.handleMsgChange} sendButton={false} attachButton={false} />
          <InputToolbox>
            <Button onClick={this.sendMsg} icon={<FontAwesomeIcon icon={faPlay} />} />
          </InputToolbox>
        </div>
      </div>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);



