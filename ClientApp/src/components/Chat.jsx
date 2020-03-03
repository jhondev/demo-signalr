import React, { Component } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export default class Chat extends Component {
  state = {
    nick: "",
    message: "",
    messages: []
  };

  componentDidMount = () => {
    const nick = window.prompt("Your name:", "John");

    this.hubConnection = new HubConnectionBuilder().withUrl("/chatHub").build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("Error while establishing connection :("));

    this.hubConnection.on("handleNewMessage", this.handleNewMessage);

    this.setState(() => ({ nick }));
  };

  handleNewMessage = (nick, receivedMessage) => {
    const text = `${nick}: ${receivedMessage}`;
    const messages = this.state.messages.concat([text]);
    this.setState({ messages });
  };

  sendMessage = () => {
    this.hubConnection
      .invoke("sendToAll", this.state.nick, this.state.message)
      .catch(err => console.error(err));

    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        <br />
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />

        <button onClick={this.sendMessage}>Send</button>

        <div>
          {this.state.messages.map((message, index) => (
            <span style={{ display: "block" }} key={index}>
              {" "}
              {message}{" "}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
