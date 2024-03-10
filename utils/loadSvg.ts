const loadSvg = (url: string) => {
    return fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); })
        .catch(err => {
            throw Error(`Unable to load SVG`, err)
        });
};
    
export default loadSvg