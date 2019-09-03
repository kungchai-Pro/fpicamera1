
import { URL } from './confingURL'

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
  let datadate = imagetime + dataPath.IdType + '.png';
  var urls = Url + 'uploadFile';
  let body = new FormData();
  body.append('file', {
    uri: dataPath.uri_Image, name: datadate,
    filename: 'imageName.png', type: 'image/png'
  }
  );
  body.append('Content-Type', 'image/png');
   return fetch(urls, {
    method: 'POST', headers: {
      "Content-Type": "multipart/form-data",
      "otherHeader": "foo",
    },
    body: body
  })
    .then((response) => {
 //  PostDataFuncion(dataPath, datadate)
      //  let responsPostdata = PostDataFuncion(dataPath, datadate);
      return PostDataFuncion(dataPath, datadate);
    })
    .catch((e) => {
      return 'Eror'
      console.log(e)
    })


}

function PostDataFuncion(id_im, id_name) {
  let imagetimeLocal = new Date().toLocaleDateString();
  let times = new Date().toLocaleTimeString('TH', {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });
  let datetimes = imagetimeLocal + ' ' + times

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

  return fetch(Url + 'Postcontainer', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opts)
  })
    .then((response) =>response.text())
    .catch((e) => {
      console.log(e)
    })
}

export function Notification(messes) {
  let Url = URL()
  fetch(Url + 'Api-onesignal/' + messes, {
    method: 'POST', // or 'PUT'// data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => console.log('Success:', response))
    .catch(error => console.log('Error:', error));
}

export function Get_Listcontainer() {

  let Url = URL()
  var Sdate = new Date().getDate()-1; //Current Date
  var EDate = new Date().getDate() + 7;
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year

  var startdata = year + '-' + month + '-' + Sdate;
  var EndDate = year + '-' + month + '-' + EDate;
   console.log(startdata);
   console.log(EndDate);
  //    return fetch(Url+'Getcontainer/datalist/?Nocon=&Sdate='+startdata+'&EDate=&Status=')
  return fetch(Url + 'Getcontainer/datalist/?Nocon=&Sdate=&EDate=&Status=')
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      //      console.error(error);
    });
}

export function listId(Id_con) {
  //  let config_API=URL();
  let Url = URL()
  return fetch(Url + 'Getcontainer/' + Id_con)
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      //      console.error(error);
    });
}

export function DeleteContainer(Id_con) {
  //  let config_API=URL();
  let Url = URL()
  return fetch(Url + 'Deletcontainer/Delete/' + Id_con, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      //      console.error(error);
    });
}


export function EditdataContainer(data) {
 // console.log(data)
  let Url = URL()
  // alert(data[0].id_con);
  //data_containerNO, data_sealNo, data_booking, data_typeinput, data_potoImage, data_typeImage, data_sizeCn, data_datetime, data_id_No
 const databody = {
    containerNO: data.data_containerNOs,
    sealNo: data.data_sealNos,
    booking: data.data_bookings,
    typeinput: data.data_typeinputs,
    typeImage: data.data_typeImages,
    datetime: data.data_datetimes,
  }
 return fetch(Url + 'Putcontainer/put/' + data.data_id_Nos, {
    method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(databody), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((response) => response.json())
  // .then((responseJson) => {
  //   // console.log(responseJson);
  //   return responseJson;
  // })
    .catch((error) => {
      console.error(error);
    });
  //  return console.log(data); 
}