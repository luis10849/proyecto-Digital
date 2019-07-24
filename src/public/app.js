$(document).ready(function () {
  console.log('funciona');

  listarTareas();
  function listarTareas() {
    setInterval(() => {
      $.ajax({
        url: '/salones',
        type: 'GET',
        /* success: function (salones) {
             //let tareas = JSON.parse(res);
             let template = '';
             salones.forEach(salon => {
                 template += `
                 <tr SalonId="${salon.id_salon}">
                 <td>${salon.id_salon}</td>
                 <td>
                 <a href="#" class="task-item">
                   ${salon.puerta} 
                 </a>
                 </td>
                 <td>${salon.videoBeam}</td>
                 <td>${salon.sensorMovimiento}</td>
                 <td>
                   <button class="task-delete btn btn-danger">
                    Delete 
                   </button>
                 </td>
                 </tr>
               `
             });
             */
        success: function (salones) {
          console.log(salones);

          let template = '';
          let j = 0;
          let color = "";
          for (let i = 0; i < (salones.length) / 3; i++) {


            template +=
              `
                      <div class="row">
                     
                      `
            for (let k = 0; k < 3; k++) {
              const salon = salones[j];
              console.log(salon);
              if (salon.puerta == 1 && salon.sensorMovimiento == 0) {
                color = "success";
              }
              if (salon.puerta == 1 && salon.sensorMovimiento == 1) {
                color = "primary";
              }
              if (salon.puerta == 0 && salon.sensorMovimiento == 1) {
                color = "warning";
              }
              if (salon.puerta == 0 && salon.sensorMovimiento == 0) {
                color = "warning";
              }
              if (salon.videoBeam==0) {
                color = "danger";
              }
              j++;
              template += `
                       <div class="col-sm-3 bg-light border ml-4">
                       <img class="mx-auto logo mb-2 m-2 " src="img/education.png" alt="70" width="70">
                       <label class="mx-auto">Salón ${salon.id}</label> <br>
                       <label class="mx-auto">Puerta:`

              if (salon.puerta == 1) {
                template += `
                            <img class="mx-auto  logo" src="img/pcerrada.png" alt="30" width="30">
                            `
              }
              else {
                template += `
                            <img class="mx-auto  logo" src="img/pabierta.png" alt="30" width="30">
                            `
              }



              template += `
                       </label> <br>

                       <label class="mx-auto">Video Beam:`


              if (salon.videoBeam == 1) {
                template += `
                        <img class="mx-auto  logo" src="img/true.png" alt="30" width="30">
                        `
              }
              else {
                template += `
                        <img class="mx-auto  logo" src="img/false.png" alt="30" width="30">
                        `
              }
              template += `
                           </label> <br>
                       <label class="mx-auto">Movimiento`


              if (salon.sensorMovimiento == 1) {
                template += `
                        <img class="mx-auto  logo" src="img/true.png" alt="30" width="30">
                        `
              }
              else {
                template += `
                        <img class="mx-auto  logo" src="img/false.png" alt="30" width="30">
                        `
              }

              template += `
                           </label> <br>



                       <label for="">Estado <button type="button" class="btn btn-${color}" data-toggle="modal" data-target="#modal1"></button></label> <br>
                       <a href="/horarios/horario/${salon.id}" class="btn btn-success mb-2" name="ver"> Ver horario</a>
                   </div>


                     `
            }

            template += `  
                     </div>
                     
                     <br>
                  `


          }

          $('#salones').html(template);
        }
      })
    }, 1000);

    //hasta aqui
  }

});

