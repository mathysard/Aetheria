// https://stackoverflow.com/questions/26667820/upload-a-base64-encoded-image-using-formdata
export const dataURIToBlob = (dataURI: string) => {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  
    return new Blob([ia], { type: mimeString });
};

// https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
export const blobToDataURL = (blob: Blob, callback: (dataUrl: string) => void) => {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target?.result as string);}
    a.readAsDataURL(blob);
}

export const isNumber = (number: any) => parseInt(number) == number;

export const createUniqueId = () => {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_@#".split("");
    const charsLength = allowedChars.length;
    let id = "";

    for(let i = 0; i < 25; i++) {
        let char = allowedChars[Math.round((Math.random() * charsLength) - 1)];

        if(char == undefined) {
            while(char == undefined) {
                char = allowedChars[Math.round((Math.random() * charsLength) - 1)];
            }
        }

        id += char;
    }

    return id;
}