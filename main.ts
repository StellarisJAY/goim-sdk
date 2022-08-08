import { IMClient } from "./src/websocket/client";

const main =async () => {
    let client = new IMClient('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTk5NTA2MTE2MzcsInVzZXJJZCI6ImNlZWEwZmM3MDY1MDAwIiwiZGV2aWNlSWQiOiJyYW5kb20tZGV2aWNlLTAxIn0.2jkOqhZZ35vKreHrfBR0UGdBSzO_kvavm9yR-gX7SOg', 'ws://127.0.0.1:9101')
    let {status} = await client.login()
    console.info("login status: ", status)
}

main()