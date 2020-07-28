window.onload = function () {

	var desired_char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890.,!?+-*/";
	var char_id = 0;
	var char_list = [];
	var clear_space, next_char, prev_char, create_font, canvas;
	var svgs = {};
	var reachedbeg=true, reachedend=false;

	starting();

	function starting() {
		canvas = document.getElementById("myCanvas");

		paper.setup(canvas);
		var path;
		paper.view.onMouseDown = function(event) {
			path = new paper.Path()
			path.strokeColor = 'black';
			path.strokeWidth = 10;
			path.add(event.point);
		}

		paper.view.onMouseDrag = function(event) {
			path.add(event.point);
		}

		clear_space = document.getElementById("clear-space");
		next_char = document.getElementById("next-char");
		prev_char = document.getElementById("prev-char");
		create_font = document.getElementById("create-font");
		prev_char.classList.add("disable");
    	prev_char.disabled = true;
	}

	clear_space.addEventListener('click', function() {
     	paper.project.activeLayer.removeChildren();
    }, false);

    prev_char.addEventListener("click", function() {

    	if(reachedend) {
    		reachedend = false;
    		next_char.classList.remove("disable");
			clear_space.classList.remove("disable");
			next_char.disabled = false;
			clear_space.disabled = false;
			canvas.style.background = 'none';
			canvas.style.border = 'none';
			canvas.style.boxShadow = 'none';
    	}
    	
    	if(char_id > 0) {
    		char_id--;
			document.getElementById("info").innerHTML = "Hold and move mouse and write character '<span id='letter'><b>" + desired_char[char_id] + "</b></span>' then press next for next character or press clear to clear the space.";
    	}
    	if (char_id === 0) {
    		reachedbeg = true;
    		prev_char.classList.add("disable");
    		prev_char.disabled = true;
    	}
	});

    next_char.addEventListener("click", function() {
    	if(reachedbeg) {
    		reachedbeg = false;
    		prev_char.classList.remove("disable");
    		prev_char.disabled = false;
    	}
    	
    	svg = paper.project.exportSVG({asString:true});
    	svgs[desired_char[char_id]] = svg;
    	console.log(svg);
    	paper.project.activeLayer.removeChildren();
		if(char_id < desired_char.length) {
			char_id++;
			document.getElementById("letter").innerHTML = '<b>' + desired_char[char_id] + '</b>';
		}
		if (char_id === desired_char.length) {
			reachedend = true;
			next_char.classList.add("disable");
			clear_space.classList.add("disable");
			next_char.disabled = true;
			clear_space.disabled = true;
			canvas.style.background = 'none';
			canvas.style.border = 'none';
			canvas.style.boxShadow = 'none';
			document.getElementById("info").innerHTML = 'Click "<b>CREATE FONT</b>" button!';
		}
	});

	create_font.addEventListener("click", function() {

	});
}