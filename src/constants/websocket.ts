export const WEBSOCKET = {
    ENDPOINT: '/chat',
    SUBSCRIBE: (user: any) => `/user/${user}/private`,
    PUBLISH: '/app/sendMessage',
}