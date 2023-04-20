
export const mapService = {
    connectGoogleApi,
    codeAddress,
}

function connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const MAP_KEY = `AIzaSyD8o3Cd3Npmfar4KdG811Pa-KwoZv9O4Jo`
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function codeAddress(address) {
    return new Promise((resolve) => {
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                const loc = JSON.parse(JSON.stringify(results[0].geometry.location))
                resolve(loc)
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        })
    })
}