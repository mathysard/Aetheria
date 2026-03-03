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
