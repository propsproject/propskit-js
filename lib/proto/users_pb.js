/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.pending_props_pb.ApplicationUser', null, global);
goog.exportSymbol('proto.pending_props_pb.WalletToUser', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pending_props_pb.ApplicationUser = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pending_props_pb.ApplicationUser, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.pending_props_pb.ApplicationUser.displayName = 'proto.pending_props_pb.ApplicationUser';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pending_props_pb.ApplicationUser.prototype.toObject = function(opt_includeInstance) {
  return proto.pending_props_pb.ApplicationUser.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pending_props_pb.ApplicationUser} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pending_props_pb.ApplicationUser.toObject = function(includeInstance, msg) {
  var f, obj = {
    applicationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    signature: jspb.Message.getFieldWithDefault(msg, 3, ""),
    timestamp: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pending_props_pb.ApplicationUser}
 */
proto.pending_props_pb.ApplicationUser.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pending_props_pb.ApplicationUser;
  return proto.pending_props_pb.ApplicationUser.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pending_props_pb.ApplicationUser} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pending_props_pb.ApplicationUser}
 */
proto.pending_props_pb.ApplicationUser.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setApplicationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSignature(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pending_props_pb.ApplicationUser.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pending_props_pb.ApplicationUser.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pending_props_pb.ApplicationUser} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pending_props_pb.ApplicationUser.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getApplicationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSignature();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional string application_id = 1;
 * @return {string}
 */
proto.pending_props_pb.ApplicationUser.prototype.getApplicationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.pending_props_pb.ApplicationUser.prototype.setApplicationId = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.pending_props_pb.ApplicationUser.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.pending_props_pb.ApplicationUser.prototype.setUserId = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string signature = 3;
 * @return {string}
 */
proto.pending_props_pb.ApplicationUser.prototype.getSignature = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.pending_props_pb.ApplicationUser.prototype.setSignature = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 timestamp = 4;
 * @return {number}
 */
proto.pending_props_pb.ApplicationUser.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.pending_props_pb.ApplicationUser.prototype.setTimestamp = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pending_props_pb.WalletToUser = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pending_props_pb.WalletToUser.repeatedFields_, null);
};
goog.inherits(proto.pending_props_pb.WalletToUser, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.pending_props_pb.WalletToUser.displayName = 'proto.pending_props_pb.WalletToUser';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pending_props_pb.WalletToUser.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pending_props_pb.WalletToUser.prototype.toObject = function(opt_includeInstance) {
  return proto.pending_props_pb.WalletToUser.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pending_props_pb.WalletToUser} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pending_props_pb.WalletToUser.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.pending_props_pb.ApplicationUser.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pending_props_pb.WalletToUser}
 */
proto.pending_props_pb.WalletToUser.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pending_props_pb.WalletToUser;
  return proto.pending_props_pb.WalletToUser.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pending_props_pb.WalletToUser} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pending_props_pb.WalletToUser}
 */
proto.pending_props_pb.WalletToUser.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = new proto.pending_props_pb.ApplicationUser;
      reader.readMessage(value,proto.pending_props_pb.ApplicationUser.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pending_props_pb.WalletToUser.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pending_props_pb.WalletToUser.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pending_props_pb.WalletToUser} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pending_props_pb.WalletToUser.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.pending_props_pb.ApplicationUser.serializeBinaryToWriter
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.pending_props_pb.WalletToUser.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.pending_props_pb.WalletToUser.prototype.setAddress = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated ApplicationUser users = 2;
 * @return {!Array<!proto.pending_props_pb.ApplicationUser>}
 */
proto.pending_props_pb.WalletToUser.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.pending_props_pb.ApplicationUser>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pending_props_pb.ApplicationUser, 2));
};


/** @param {!Array<!proto.pending_props_pb.ApplicationUser>} value */
proto.pending_props_pb.WalletToUser.prototype.setUsersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.pending_props_pb.ApplicationUser=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pending_props_pb.ApplicationUser}
 */
proto.pending_props_pb.WalletToUser.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.pending_props_pb.ApplicationUser, opt_index);
};


proto.pending_props_pb.WalletToUser.prototype.clearUsersList = function() {
  this.setUsersList([]);
};


goog.object.extend(exports, proto.pending_props_pb);
