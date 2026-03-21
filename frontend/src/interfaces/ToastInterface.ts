export interface ToastInterface {
    state: "success"|"error"|"warning"|"info";
    text: string;
}