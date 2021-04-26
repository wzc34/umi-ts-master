/*
 * @Description: soketManager
 * @Author: yujiaoLiu  
 * @Date: 2021-03-08
 * @Change yujiaoLiu 2021-03-08
 */

import Byte from "@/services/vo/socket/byte";
import Socket from "./socket";
import { SocketName } from '@/constants';
import Protocol from "./protocol";
import eventBus from "@/utils/eventBus";

let _sockets: any[] = [];
let _protocolTypes: any[];
let readBytes = new Byte();
readBytes.endian = Byte.LITTLE_ENDIAN;
let writeBytes = new Byte();
writeBytes.endian = Byte.LITTLE_ENDIAN;

export default class SocketManager {

    static socketID: any = undefined;
    static isReconnect: any = false;
    static timeId: any = undefined;

    public constructor() {
    }

    static SetProtocolTypes(protocolTypes) {
        _protocolTypes = protocolTypes;
    }

    static RegisterSocket(socketID) {
        let socket = _sockets[socketID];

        if (socket) {
            console.log(("Socket " + (socketID + " has already registered!")));
            return;
        }
        socket = new Socket(socketID);
        _sockets[socketID] = socket;
        return socket;
    }

    /**
     * @return {undefined}
     */
    static UnregisterSocket(socketID) {
        let socket = _sockets[socketID];
        if ((socket != undefined)) {
            socket.disconnect();
            _sockets[socketID] = undefined;
            return socket;
        }
        return undefined;
    }

    static GetSocket(socketID) {
        return _sockets[socketID];
    }

    static Connect(socketID) {
        let socket = _sockets[socketID];

        if (!socket) {
            console.log("socket == nil");
            return;
        }
        if (socket.connected) {
            console.log("socket " + socketID  + " in connected");
            return;
        }
        SocketManager.socketID = socketID;
        socket.Connect();
    }

    static Close(socketID) {
        let socket = _sockets[socketID];
        if ((socket == undefined)) {
            console.log("that:Close but socket == nil");
            return;
        } else {
            _sockets[socketID] = null
        }
        console.log(("Close Socket:" + socketID));

        eventBus.emit('SocketReconnent', socketID)
    }

    static Destory(socketID) {
        let socket = _sockets[socketID];
        if (socket) {
            socket.dispose();
            _sockets[socketID] = undefined;
        }
    }

    static Send(protocol, socketID = SocketName.chatMessage) {
        let socket = _sockets[socketID];

        if (!socket) {
            console.log(("send Socket " + (socketID + " is not exist!")));
            return;
        }
        if (!socket.connected) {
            return;
        }
        writeBytes.writeInt16(0);
        writeBytes.writeInt16(protocol.protocolID);
        
        protocol.Encode(writeBytes);
        // 写入长度
        let length = writeBytes.length - 2;
        writeBytes.pos = 0;
        writeBytes.writeInt16(length);

        socket.Send(writeBytes);
        writeBytes.clear();
    }

    static Unregister(protocolID, socketID, func) {
        let socket = _sockets[socketID];
        if (!socket) {
            console.log(("Socket " + (socketID + " is not exist!")));
            return;
        }
        socket.trggers.removeListener(protocolID, func);
        console.log("socket:" + socketID + ",unregister->" + protocolID);
    }

    static OnDestory() {
        for (let k in _sockets) {

            if (k.startsWith("__") && k.endsWith("__")) continue;
            if (_sockets[k] != undefined) continue;

            let v = _sockets[k];
            SocketManager.Destory(k);
        }
    }

    static OnConnect(socketID) {
        console.log(("OnConnect:" + socketID));
        let socket = _sockets[socketID];
        if (!socket) {
            console.log(("Socket " + (socketID + " is not exist!")));
            return;
        }
        socket.EncryptToken = undefined;
        // if (SocketManager.timeId) {
        //     TimerManager.clearTimer(SocketManager.timeId);
        //     SocketManager.timeId = undefined;
        // }
        eventBus.emit('GetChatMessage', socketID)
    }

    static OnConnectFailed(socketID) {
        // console.log("OnConnectFailed");
    }

    static OnReceive(socketID, pack) {
        readBytes.clear();
        readBytes.writeArrayBuffer(pack);
        readBytes.pos = 0;

        try {
            let protocolID = readBytes.ReadShort();

            const protocol = new Protocol(protocolID, {})


            let socket = _sockets[socketID];
            if (socket != undefined) {

                if (protocol == undefined) {
                    console.log(("Unrecognized protocolID:" + protocolID));
                } else {
                    protocol.Decode(readBytes);
                    // socket.trggers.fire(protocolID, protocol);
                    eventBus.emit('ReceiveData', { protocolID, data: protocol.ReceiveData });
                }
            }
        } catch (error) {
            console.log("process proto error: ", error, error.stack)
        }
    }

    /**
     * 是否已连接
     * @param socketID 
     */
    static isConnect(socketID) {
        let socket = _sockets[socketID];
        if (!socket) {
            console.log("socket == nil");
            return false;
        }
        if (socket.connected) {
            console.log("socket Connect in connected");
            return true;
        }
        return false;
    }
    //The end
}

