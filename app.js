function createUploader() {
	let publicIdDiv = document.getElementById('publicIDdiv')
	let publicIdValue = document.getElementById('publicIDvalue')
	let submitButton = document.getElementById('btnCreateUser')
	publicIdDiv.hidden = true
	// publicIdDiv.style.display = "none";
	submitButton.disabled = true
	return cloudinary.createUploadWidget({
		cloudName: 'dkc0ylnio',
		uploadPreset: 'tvyicifd',
		sources: ['local'],
		multiple: false,
		theme: 'minimal',
		styles: {
			palette: {
				link: '#1abc9c'
			}
		}
	}, (error, result) => {
		if (!error && result && result.event === "success") {
			console.log('Done! Here is the image info: ', result);
			submitButton.disabled = false
			publicIdDiv.hidden = false
			// publicIdDiv.style.display = "block";
			publicIdValue.value = result.info.public_id
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const uploadWidget = createUploader();
	//document.getElementById('photo').addEventListener('click', () => uploadWidget.open())
	document.getElementById('photoBtn').addEventListener("click", function(){
		    uploadWidget.open();
	}, false)
})
