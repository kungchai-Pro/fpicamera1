
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

export function Notification(messes){
    let Url = URL()
    fetch(Url +'Api-onesignal/'+messes, {
        method: 'POST', // or 'PUT'// data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        },
      })
      .then(response => console.log('Success:',response))
      .catch(error => console.log('Error:', error));
}

export function Get_Listcontainer() {

   let Url = URL()
   var Sdate = new Date().getDate(); //Current Date
   var EDate = new Date().getDate()+1; 
   var month = new Date().getMonth() + 1; //Current Month
   var year = new Date().getFullYear(); //Current Year

    let startdata=year+'-'+month+'-'+Sdate;
    let EndDate=year+'-'+month+'-'+EDate;
    // console.log(startdata);
    // console.log(EndDate);
       return fetch(Url+'Getcontainer/datalist/?Nocon=&Sdate='+startdata+'&EDate='+EndDate+'&Status=')
    // return fetch(Url+'Getcontainer/datalist/?Nocon=&Sdate=2019-07-15&EDate=2019-07-17&Status=')
    .then((response) => response.json())
    .then((responseJson) => {
       // console.log(responseJson);
        return responseJson;
      })
    .catch((error) => {
  //      console.error(error);
    });
  }

  export  function listId(Id_con){
    //  let config_API=URL();
    let Url = URL()
      return fetch(Url+'Getcontainer/datalist/?Nocon='+Id_con+'&Sdate=&EDate=&Status=')
      .then((response) => response.json())
      .then((responseJson) => {
         // console.log(responseJson);
          return responseJson;
        })
      .catch((error) => {
    //      console.error(error);
      });
     }


     export  function DeleteContainer(Id_con){
        //  let config_API=URL();
        let Url = URL()
          return fetch(Url+'Deletcontainer/Delete/'+Id_con,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
          })
          .then((response) =>{
              console.log(response);
            return response;
          })
          .catch((error) => {
        //      console.error(error);
          });
         }