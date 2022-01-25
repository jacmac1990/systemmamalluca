$(document).ready(function() {
  var input = '<input type="text" placeholder="Filtrar.." />';
  var select = '<select name="select"> <option value="value1">Value 1</option>  <option value="value2" selected>Value 2</option> <option value="value3">Value 3</option> </select>';
  $('#mydatatable tfoot th').each(function () {
      $(this).html(input);
  } );

  var table = $('#mydatatable').DataTable({
      "dom": 'B<"float-left"i><"float-right"f>t<"float-left"l><"float-right"p><"clearfix">',
      "responsive": true,
      "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      },
      "order": [[ 2, "desc" ]],
      "initComplete": function () {
          this.api().columns().every( function () {
              var that = this;

              $( 'input', this.footer() ).on( 'keyup change', function () {
                  if ( that.search() !== this.value ) {
                      that
                          .search( this.value )
                          .draw();
                      }
              });
          })
      }
  });
});









/*const { formaterdate } = require("../../lib/handlebars");

function myFunction(num,id) {
  
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(id);      
  filter = input.value.toUpperCase();
  console.log(filter);  
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[num];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

 function  myFunctionDate (num,id) {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue,aaa;
  input = document.getElementById(id);  
  console.log(input.value);
  filter = moment(date).format(formato);
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[num];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};
 */