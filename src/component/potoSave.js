// function apilogin(us,pw){

//     var url = 'http://192.168.10.110:8080/api/auth/signin';
//     var data = {
//         "username":us,
//         "password":pw
//     }
//  return fetch(url, {
//       method: 'POST', // or 'PUT'
//       body: JSON.stringify(data), // data can be `string` or {object}!
//       headers:{
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(res => res.json())
//     .catch(error => console.error('Error:', error));
// }

export function Savedatafull(data) {
    console.log(data[0].IdType)
    return UpfilePicture(data)
    // return  data[0].IdType;
}
function UpfilePicture(dataPath) {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
     let imagetime=date+''+month+''+year+'_'+hours+''+min+''+sec;
    //    alert(PicturePath)
    let datadate = imagetime+dataPath[0].IdType+'.png';
    var Url = 'http://192.168.10.110:8080/api/uploadFile';
    let body = new FormData();
    body.append('file', {
        uri: dataPath[0].uri_Image, name: datadate,
        filename: 'imageName.png', type: 'image/png'
    }
    );
    body.append('Content-Type', 'image/png');
    fetch(Url, {
        method: 'POST', headers: {
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
        }, body: body
    })
        .then((response) => {
                PostDataFuncion(dataPath,datadate);
            console.log(response);
        })
        .catch((e) => {
            console.log(e)
        })
}

function PostDataFuncion(id_im,id_name) {
    //   ChromeSamples.log('Posting request to GitHub API...');
     console.log(id_im[0].id_contai)
     console.log(id_im[0].id_seal)
     console.log(id_im[0].id_bookiing)
     console.log(id_im[0].IdType)
 

    opts = {
        containernumber:id_im[0].id_contai,
        sealno: id_im[0].id_seal,
        booking:id_im[0].id_bookiing,
        imageno:id_name,
        datetimeactual: "2019-06-17",
        typetnput: id_im[0].IdType,
        size: "40"
    }
    fetch('http://192.168.10.110:8080/api/Postcontainer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    })
    .then((response) => {
    console.log(response);
    })
    .catch((e) => {
            console.log(e)
    })

}