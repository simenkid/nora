var util = require('util'),
    EventEmitter = require('events');

var Q = require('q'),
    m = require('mraa'),
    _ = require('busyman');

var CNST = require('./constants.json'),
    OPMODE = CNST.OPMODE,
    REG = CNST.REG;

// // Chip Select control (active LOW)
// void csOn() 
// {
//   m_gpioCS.write(0);
// };

// void csOff() 
// {
//   m_gpioCS.write(1);
// };

// [TODO] promisify the spi.read(), spi.write()
// [TODO] promisify the cs.on(), cs.off()
function Sx1276(spi, cs) {

};

Sx1276.prototype.readReg = function (address, callback) {
    // number
    // read a register
    // return number

    if (!_.isNumber(address))
        throw new TypeError('address should be a number.');
    else if (address < 0 || address > 255)
        throw new RangeError('address should be an integer in between 0 and 255.');

    var _spi = this._spi,
        _cs = this._cs,
        readBuf = Buffer.alloc(2);

    readBuf[0] = (address &= 0x7f); // msb: 1(write), 0(read)
    readBuf[1] = 0x00;              // dummy data when reading

    _cs.on().then(function () {
        return _spi.write(readBuf);
    }).then(function () {
        return _cs.off();
    }).then(function (rx) {
        return rx[1];   // number
    }).nodeify(callback);
};

Sx1276.prototype.writeReg = function (reg, val) {
    // number, number
    // write to a register
    // return boolean
};

Sx1276.prototype.getChipVersion = function () {
    //  
    // return the chip revision (usually 0x12)
    // return number
};

Sx1276.prototype.reset = function () {
    //  
    // reset the modem
    //
}

Sx1276.prototype.readFifo = function (buffer  len) {
    // uint8_t *, number
    // read the FIFO into a buffer
    // 
};

Sx1276.prototype.writeFifo = function (buffer  len) {
    // uint8_t *, number
    // write a buffer into the FIFO
    // 
};

Sx1276.prototype.setChannel = function (freq) {
    // number
    // Set the frequency to transmit and receive on
    // 
};

Sx1276.prototype.setOpMode = function (opMode) {
    // MODE_T(number)
    // Set the operating mode
    // 
};

Sx1276.prototype.setModem = function (modem) {
    // RADIO_MODEM_T(number)
    // Set the modem to access. This can be either the LORA or KSK/OOK modem.
    // 
};

Sx1276.prototype.setSleep = function () {
    // 
    // Place the SX1276 into sleep mode
    // 
};

Sx1276.prototype.setStandby = function () {
    // 
    // Place the SX1276 into standby mode
    // 
};

Sx1276.prototype.getRSSI = function (modem) {
    // RADIO_MODEM_T(number)
    // Return the current Received Signal Strength Indicator for the given modem
    // number
};

Sx1276.prototype.isChannelFree = function (modem, freq, rssiThresh) {
    // RADIO_MODEM_T, Number, Number(undefined)
    // Check to see if a given channel is free by comparing the RSSI to the supplied threshold.
    // Boolean
};

Sx1276.prototype.sendStr = function (buffer, timeout) {
    // String, Number(ms)
    // Send the supplied string. This writes the string into the FIFO and places the modem in transmit mode (via setTx()). This is a wrapper around send().
    // RADIO_EVENT_T
};

Sx1276.prototype.send = function (buffer, size, timeout) {
    // Uint8_t *, Number, Number(ms)
    // Send the supplied buffer. The writes the buffer into the FIFO and places the modem in transmit mode (via setTx()).
    // RADIO_EVENT_T
};

Sx1276.prototype.setRxConfig = function (modem, bandwidth, datarate, coderate, bandwidthAfc, preambleLen, symbTimeout, fixLen, payloadLen, crcOn, freqHopOn, hopPeriod, iqInverted, rxContinuous) {
    // modem: RADIO_MODEM_T
    // bandwidth: Number, The bandwidth to use. Valid values are FSK : >= 2600 and <= 250000 Hz LoRa: [125 kHz, 250 kHz, 500 kHz]
    // datarate: Number, Sets the Datarate FSK : 600..300000 bits/s LoRa: [6: 64, 7: 128, 8: 256, 9: 512, 10: 1024, 11: 2048, 12: 4096 chips]
    // coderate: Number, Sets the coding rate (LoRa only) FSK : N/A ( set to 0 ) LoRa: [1: 4/5, 2: 4/6, 3: 4/7, 4: 4/8]
    // bandwidthAfc: Number, Sets the AFC Bandwidth (FSK only) FSK : >= 2600 and <= 250000 Hz LoRa: N/A ( set to 0 )
    // preambleLen: Number, Sets the Preamble length FSK : Number of bytes LoRa: Length in symbols (the hardware adds 4 more symbols)
    // symbTimeout: Number, Sets the RxSingle timeout value (LoRa only) FSK : N/A ( set to 0 ) LoRa: timeout in symbols
    // fixLen: Boolean, Fixed length packets [false: variable, true: fixed]
    // payloadLen: Number, Sets payload length when fixed length is used
    // crcOn: Boolean, Enables/Disables the CRC [false: OFF, true: ON]
    // freqHopOn: Boolean, undefined
    // hopPeriod: Number, undefined
    // iqInverted: Boolean, Inverts IQ signals (LoRa only) FSK : N/A ( set to 0 ) LoRa: [false: not inverted, true: inverted]
    // rxContinuous: Boolean, Sets the reception in continuous mode [false: single mode, true: continuous mode]

    // Set the receive configuration for a modem. It is important that both the receive and transmit configurations match in order for communication to work between two radios.
};

Sx1276.prototype.setTxConfig = function (modem, power, fdev, bandwidth, datarate, coderate, preambleLen, fixLen, crcOn, freqHopOn, hopPeriod, iqInverted) {
    // modem: RADIO_MODEM_T
    // power: Number, Sets the output power [dBm]
    // fdev: Number, Sets the frequency deviation (FSK only) FSK : [Hz] LoRa: 0
    // bandwidth: Number, Sets the bandwidth (LoRa only) FSK : 0 LoRa: [125 kHz, 250 kHz, or 500 kHz]
    // datarate: Number, Sets the Datarate FSK : 600..300000 bits/s LoRa: [6: 64, 7: 128, 8: 256, 9: 512, 10: 1024, 11: 2048, 12: 4096 chips]
    // coderate: Number, Sets the coding rate (LoRa only) FSK : N/A ( set to 0 ) LoRa: [1: 4/5, 2: 4/6, 3: 4/7, 4: 4/8]
    // preambleLen: Number, Sets the preamble length FSK : Number of bytes LoRa: Length in symbols (the hardware adds 4 more symbols)
    // fixLen: Boolean, Fixed length packets [false: variable, true: fixed]
    // crcOn: Boolean, Enables disables the CRC [false: OFF, true: ON]
    // freqHopOn: Boolean, undefined
    // hopPeriod: Number, undefined
    // iqInverted: Boolean, Inverts IQ signals (LoRa only) FSK : N/A ( set to 0 ) LoRa: [false: not inverted, true: inverted]

    // Set the transmit configuration for a modem. It is important that both the receive and transmit configurations match in order for communication to work between two radios.
};

Sx1276.prototype.setRx = function (timeout) {
    // Number, The timeout in milliseconds
    // Start a receive operation. The method will return when completed, either successfully, or in error (crc, or other issue). If completed successfully, the returned buffer can be read via getRxBuffer() or getRxBufferStr() . In addition, values for RSSI and SNR (Lora only) can be retrieved.
    // RADIO_EVENT_T
};

Sx1276.prototype.getRxBufferStr = function () {
    // 
    // Upon a successful receive, this method can be used to retrieve the received packet.
    // String: The received buffer in a std::string
};

Sx1276.prototype.getRxBuffer = function () {
    // 
    // Upon a successful receive, this method can be used to retrieve the received packet.
    // Uint8_t *: a pointer to the received buffer. You can use getRxLen() to determine the number of valid bytes present.
};

Sx1276.prototype.getRxRSSI = function () {
    // 
    // Upon a successful receive, this method can be used to retrieve the received packet's Received Signal Strength Indicator (RSSI) value.
    // Number: RSSI value
};

Sx1276.prototype.getRxSNR = function () {
    // 
    // Upon a successful receive, this method can be used to retrieve the received packet's Signal to Noise (SNR) value.
    // Number: SNR value
};

Sx1276.prototype.getRxLen = function () {
    // 
    // Upon a successful receive, this method can be used to retrieve the number of bytes received.
    // Number: the number of bytes received
};
