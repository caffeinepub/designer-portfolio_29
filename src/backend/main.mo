import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      switch (Text.compare(message1.name, message2.name)) {
        case (#equal) { Text.compare(message1.email, message2.email) };
        case (order) { order };
      };
    };
  };

  let messages = Map.empty<Principal, ContactMessage>();

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    if (messages.containsKey(caller)) { Runtime.trap("You have already submitted a message.") };
    let contactMessage : ContactMessage = {
      name;
      email;
      message;
    };
    messages.add(caller, contactMessage);
  };

  public query ({ caller }) func getAllMessages() : async [ContactMessage] {
    messages.values().toArray().sort();
  };
};
