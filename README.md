# Propskit-js

This library is used with the Props Sidechain, making it easier to communicate with it via the rest API.
It can do the following actions:
1. Issue earnings
2. Revoke earnings
3. Settle earnings (Not yet implemented)
4. Ethereum balance updates
5. Linking ethereum wallet to a user
6. Updating the last ethereum synched block
7. Accumalate commands and send them as a batch
8. Retrieve stored data per state address
9. Sign/Recover messages
10. Listen to events from the sidechain

Please refer to the lib/tests/sawtooth_api.test.ts for examples on how to use for each of the actions.

