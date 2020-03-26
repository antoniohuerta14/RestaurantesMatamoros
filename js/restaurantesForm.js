jQuery(document).ready(function(){
    $("#btnEnviar").click(function(event) {
    event.preventDefault();

    let id = $('#idRes').val();
    let nombre = $("#nombreRes").val();
    let servicio = $("#service").val();
    let tel = $("#telRes").val();
    let fb = $("#facebook").val().toLowerCase();
    let desc = $("#desc").val();
    let imagen = document.getElementById('imagen').files[0];
    let imgVerified = emptyImg(imagen);
    var arrayData = arrayJSON(nombre,servicio,fb,tel,desc,imgVerified);
        if (confirm('Los datos son correctos?')){
        addImg(imagen,imgVerified,arrayData,id);
        }
    });
});

function getDatos(){
    var task = firebase.database().ref('restaurantes/');
    task.on("child_added",function(snapshot){
        var taskValue = snapshot.val();

        let nombre = taskValue.nombre;
        let servicio = taskValue.servicio;
        let fb = taskValue.contacto;
        let tel = taskValue.telefono;
        let desc = taskValue.descripcion;
        let img = taskValue.imgName;
        var storageRef;
        if(img!='unnamed.jpg'){
            storageRef = storage.ref('Logos/Restaurantes/'+img);
        }else{
            storageRef = storage.ref('Logos/'+img);
        }
        storageRef.getDownloadURL().then(function(imagen){
            var tabla = createTableDatos(nombre,servicio,fb,tel,desc,imagen);
            innerHTML('tabla',tabla);
        });
    })
}

function arrayJSON(nombre,servicio,fb,tel,desc,img){
    var data = {
        nombre : nombre,
        servicio : servicio,
        contacto: fb,
        telefono: tel,
        descripcion: desc,
        imgName : img
    };
    return data;
}

function emptyImg(img){
    if(img==undefined){
         //return img.value = 'unnamed.jpg';
         //return storage.ref('Imagenes/unnamed.jpg');
         return 'unnamed.jpg'
    }else{
        return img.name;
    }
}

function addImg(imagen,nombre,arrayData,id){
    const insertar = firebase.database().ref('restaurantes/'+id);
    if(nombre!='unnamed.jpg'){
        let storageRef = storage.ref('Logos/Restaurantes/'+nombre);
        let uploadTask = storageRef.put(imagen);
        uploadTask.on('state_changed',function(snapshot){
            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log('Upload is '+parseInt(progress)+'% done');
                },function(error){
                    console.log(error.message);
                    alert("No se pudieron añadir");
                },function(){
                    insertar.update(arrayData); 
                    alert("Se Añadieron Correctamente");
                    $('#formulario').trigger("reset");
        })
    }else{
        insertar.update(arrayData); 
        alert("Se Añadieron Correctamente");
        $('#formulario').trigger("reset");
        }
}

function createTableDatos(nombre,servicio,fb,tel,desc,imagen){
return `
<thead class="thead-dark">
    <tr>
        <th colspan="2">`+nombre+`</th>
    </tr>
</thead>
<tbody>
    <tr>
      <td rowspan="4"><img src="`+imagen+`" alt="`+nombre+`"></td>
      <td>`+servicio+`</td>
    </tr>
    <tr>
      <td><a href="tel:`+tel+`">`+tel+`</a></td>
    </tr>
    <tr>
      <td><a href="https://www.facebook.com/`+fb+`" target="blank">`+fb+`</a></td>
    </tr>
    <tr>
      <td>`+desc+`</td>
    </tr>
</tbody>
`
}

function innerHTML(valor,result){
    return document.getElementById(valor).innerHTML+=result;
}