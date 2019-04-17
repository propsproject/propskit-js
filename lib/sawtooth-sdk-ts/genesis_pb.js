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

var batch_pb = require('./batch_pb.js');
goog.object.extend(proto, batch_pb);
goog.exportSymbol('proto.GenesisData', null, global);
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
proto.GenesisData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.GenesisData.repeatedFields_, null);
};
goog.inherits(proto.GenesisData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GenesisData.displayName = 'proto.GenesisData';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.GenesisData.repeatedFields_ = [1];



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
proto.GenesisData.prototype.toObject = function(opt_includeInstance) {
  return proto.GenesisData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GenesisData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GenesisData.toObject = function(includeInstance, msg) {
  var obj = {
    batchesList: jspb.Message.toObjectList(msg.getBatchesList(),
    batch_pb.Batch.toObject, includeInstance)
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
 * @return {!proto.GenesisData}
 */
proto.GenesisData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GenesisData;
  return proto.GenesisData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GenesisData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GenesisData}
 */
proto.GenesisData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new batch_pb.Batch;
      reader.readMessage(value,batch_pb.Batch.deserializeBinaryFromReader);
      msg.addBatches(value);
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
proto.GenesisData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GenesisData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GenesisData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GenesisData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBatchesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      batch_pb.Batch.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Batch batches = 1;
 * @return {!Array<!proto.Batch>}
 */
proto.GenesisData.prototype.getBatchesList = function() {
  return /** @type{!Array<!proto.Batch>} */ (
    jspb.Message.getRepeatedWrapperField(this, batch_pb.Batch, 1));
};


/** @param {!Array<!proto.Batch>} value */
proto.GenesisData.prototype.setBatchesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Batch=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Batch}
 */
proto.GenesisData.prototype.addBatches = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Batch, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.GenesisData.prototype.clearBatchesList = function() {
  this.setBatchesList([]);
};


goog.object.extend(exports, proto);