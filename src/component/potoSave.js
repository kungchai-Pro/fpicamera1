
import { URL } from './confingURL'
// import fetch from 'react-native-fetch-polyfill';

export function Savedatafull(data) {
    return UpfilePicture(data)
}
function UpfilePicture(dataPath) {

        let Url = URL()
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        let imagetime = date + '' + month + '' + year + '_' + hours + '' + min + '' + sec;
        //    alert(PicturePath)
        let datadate = imagetime + dataPath.IdType + '.png';
        var urls = Url + 'uploadFile';
        let body = new FormData();
        body.append('file', {
            uri: dataPath.uri_Image, name: datadate,
            filename: 'imageName.png', type: 'image/png'
        }
        );
        body.append('Content-Type', 'image/png');
        fetch(urls,{
            method: 'POST', headers: {
                "Content-Type": "multipart/form-data",
                "otherHeader": "foo",
            },
            body: body
        })
        .then((response) => {

                    PostDataFuncion(dataPath, datadate);
            })
            .catch((e) => {
                return'Eror'
                console.log(e)
            })


}

function PostDataFuncion(id_im, id_name) {
    let imagetimeLocal =  new Date().toLocaleDateString();
    let times=new Date().toLocaleTimeString('TH', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"});
        let datetimes=imagetimeLocal+' '+times

    let Url = URL()
    opts = {
        containerNO: id_im.id_contai,
        sealNo: id_im.id_seal,
        booking: id_im.id_booking,
        potoImage: id_name,
        typeinput: id_im.Id_InOut,
        typeImage: id_im.IdType,
        datetime: datetimes,
        sizeCn: "0"
    }

    fetch(Url + 'Postcontainer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    })
        .then((response) => {

            return response.status;
            console.log(response);

        })
        .catch((e) => {
            console.log(e)
        })
}



// var FETCH_TIMEOUT = 5000;
// new Promise(function (resolve, reject) {
//     var timeout = setTimeout(function () {
//         reject(new Error('Request timed out'));
//     }, FETCH_TIMEOUT);
//     fetch('https://example.com/request&#39')
//         .then(function (response) {
//             clearTimeout(timeout);
//             if (response && response.status == 200) return response.json();
//             else reject(new Error('Response error'));
//         })
//         .then(function (responseObject) {
//             // process results
//             resolve();
//         })
//         .catch(function (err) {
//             reject(err);
//         });
// })
//     .then(function () {
//         // request succeed
//     })
//     .catch(function (err) {
//         // error: response error, request timeout or runtime error
//     });
