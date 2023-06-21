var button = document.querySelector('.downloadButton');
var url = document.querySelector('.inputBox');
var error = document.querySelector('.error');
let server = "http://localhost:4000";

button.addEventListener('click', function() {
    if (!url.value) {
        console.log("no url given")
        error.innerHTML = "No URL given";
        error.style.display = "block";
        setTimeout(function() {
            error.style.display = "none";
        }, 2000);
    }
    else {
        downloadVid(url.value);
    }
});

async function downloadVid(urlVal){
    error.innerHTML = "Downloading...";
    error.style.display = "block";
    const res = await fetch(`${server}/downloadVid?url=${urlVal}`);

	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${server}/downloadVid?url=${urlVal}`;
  		a.setAttribute('download', '');
		a.click();

        error.innerHTML = "Downloaded";
        setTimeout(function() {
            error.style.display = "none";
        }, 5000);
	} 
    else if(res.status == 400) {
        console.log("Invalid URL");
        error.innerHTML = "Invalid URL";
        error.style.display = "block";
        setTimeout(function() {
            error.style.display = "none";
        }, 2000);
	}
}
