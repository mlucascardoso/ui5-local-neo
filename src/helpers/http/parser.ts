export class HttpParser {
    static body: Uint8Array[] = [];

    static handle(chunk: Uint8Array): void {
        HttpParser.body.push(chunk);
    }

    static result(): any {
        const parsedBody = Buffer.concat(HttpParser.body).toString();
        const message = parsedBody.split('=')[1];
        return message;
    }
}
