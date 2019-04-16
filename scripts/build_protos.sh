#!/bin/bash

CURRENT_DIR=${1}
PROTOS_PATH="${CURRENT_DIR}/protos"
PROTOC_GEN_TS_PATH="${CURRENT_DIR}/node_modules/.bin/protoc-gen-ts"

EARNING_PROTO="${PROTOS_PATH}/earning.proto"
BALANCE_PROTO="${PROTOS_PATH}/balance.proto"
EVENTS_PROTO="${PROTOS_PATH}/events.proto"
PAYLOAD_PROTO="${PROTOS_PATH}/payload.proto"
PROTO_PB_OUT="${CURRENT_DIR}/src/lib/generated"

TEMP_DIR="${CURRENT_DIR}/temp"
SAWTOOTH_OUT="${CURRENT_DIR}/src/lib/sawtooth-sdk-ts"
SAWTOOTH_PROTOS_URL="https://github.com/hyperledger/sawtooth-sdk-javascript.git"
SAWTOOTH_PROTOS="./sawtooth-sdk-javascript/protos"

protoc  \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${PROTO_PB_OUT}" \
    -I "${PROTOS_PATH}" \
    "${EARNING_PROTO}" \
    "${BALANCE_PROTO}" \
    "${EVENTS_PROTO}" \
    "${PAYLOAD_PROTO}" \
    --ts_out="${PROTO_PB_OUT}"

git clone "${SAWTOOTH_PROTOS_URL}"
sawtoothProtoFiles=$(ls ${SAWTOOTH_PROTOS})

for filename in ${SAWTOOTH_PROTOS}/*.proto; do    
    protoc  \
        --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
        --js_out="import_style=commonjs,binary:${SAWTOOTH_OUT}" \
        -I "${SAWTOOTH_PROTOS}" \
        "${filename##*/}" \
        --ts_out="${SAWTOOTH_OUT}"
done

rm -rf ./sawtooth-sdk-javascript
