/*
 * @Description: socket协议
 * @Author: wangzhicheng
 * @Date: 2021-04-08 10:50:53
 */
import Byte from "@/services/vo/socket/byte";

export default class Protocol {
    private protocolID = 6019;
    private param = {};
    private receiveData: any;

    constructor(protocolID, param) {
        this.protocolID = protocolID;
        this.param = param;
    }

    Reset () {
        
    }

    Encode(bytes: Byte) {
        bytes.writeUTFBytes(JSON.stringify(this.param));
    }

    Decode(bytes: Byte) {
        bytes.pos = 0;
        const count_args = bytes.ReadShort();
        this.receiveData = bytes.byteToString(bytes.ReadBytes(count_args))
    }

    get ReceiveData() {
        return this.receiveData;
    }
}
