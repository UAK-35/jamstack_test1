document.addEventListener('DOMContentLoaded', () => {
	let photo = ''
	let publicIdDiv = document.getElementById('publicIdDiv')
	let publicIdValue = document.getElementById('publicIdValue')
	let submitButton = document.getElementById('createPage')
	publicIdDiv.hidden = true
	submitButton.hidden = true
	const uploadWidget = cloudinary.createUploadWidget({
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
			photo = result.info.public_id
			submitButton.disabled = false
			publicIdDiv.hidden = false
			publicIdValue.value = photo
		}
	})
	//document.getElementById('photo').addEventListener('click', () => uploadWidget.open())
	document.getElementById('photo').addEventListener("click", function(){
		    uploadWidget.open();
	}, false)
})