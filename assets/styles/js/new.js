let counter = 3;

$(document).ready(function() {
	var wrapper   		= $(".response"); //Fields wrapper
	var add_button      = $(".addfield"); //Add button ID
	
	var x = 1; //initlal text box count
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		x++; //text box increment
		$(wrapper).append('<div class="mb-3 row"><div class="col"><label class="form-label" for="ingredient'+counter+'">Ingredient:</label> <input class="form-control" type="text" id="ingredient'+counter+'" name="ingredient1" list="ingredients" required></div><div class="col"><label class="form-label" for="unit'+counter+'">Unit:</label> <select class="form-control" id="unit'+counter+'" name="unit1" required> <option value="g">g</option> <option value="pc">pc</option> <option value="ml">ml</option> </select> </div><div class="col"> <label class="form-label" for="amount'+counter+'">Amount:</label> <input class="form-control" type="number" min="0" step="any" id="amount'+counter+'" name="amount1" required></div></div>');	
		counter ++;
	});
	
	$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
		e.preventDefault(); $(this).parent('div').remove(); x--;
	})
});


$(document).ready(function() {
	var wrapper   		= $(".response"); //Fields wrapper
	var remove_button      = $(".removefield"); //Add button ID
	
	var x = 1; //initlal text box count
	$(remove_button).click(function(e){ //on add input button click
		e.preventDefault();
		x++; //text box increment
		$(".response .row:last-child").remove();	
		counter --;
	});
});

(function () {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll('.validated-form')
  
	// Loop over them and prevent submission
	Array.from(forms)
	  .forEach(function (form) {
		form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		  }
  
		  form.classList.add('was-validated')
		}, false)
	  })
  })()

const options = $('select.alphabet option');
const arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
options.each(function(i, o) {
  o.value = arr[i].v;
  $(o).text(arr[i].t);
});