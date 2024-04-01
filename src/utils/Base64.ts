export class Base64 {
    public encode(data: string) {
        return Buffer.from(data).toString("base64");
    }
    public decode(data: string) {
        return Buffer.from(data, "base64").toString("utf-8");
    }
}