app.factory('PhotosResource', function ($resource, $http, $q) {
    var photosUrl = '/api/photos';
    var PhotosResource = $resource(photosUrl + '/:id', {id: '@id'});

    return {
        PhotosResource: PhotosResource,
        getLatestPhotos: function () {
            return PhotosResource.query({sort: '-published', limit: 4});
        },
        getPopularPhotos: function () {
            return PhotosResource.query({sort: '-downloadsCount', limit: 4});
        },
        downloadFile: function (id) {
            return downloadFile(id);
        },
        getUnapproved: function (id) {
            return PhotosResource.query({'showUnapproved':true, limit: 4});
        }
    };

    function downloadFile(id) {
        var downloadUrl = '/api/photos/' + id + '/download';
        var deferred = $q.defer();
        $http.get(downloadUrl, {responseType: "arraybuffer"})
            .success(function (data, status, headers) {

                var octetStreamMime = "application/octet-stream";
                headers = headers(); // Get the headers

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers["x-filename"] || "download.bin";

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers["content-type"] || octetStreamMime;

                // Support for saveBlob method (Currently only implemented in Internet Explorer as msSaveBlob, other extension incase of future adoption)
                var saveBlob = navigator.msSaveBlob || navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;

                var blob;
                var url;
                if (saveBlob) {
                    // Save blob is supported, so get the blob as it's contentType and call save.
                    blob = new Blob([data], { type: contentType });
                    saveBlob(blob, filename);
                    // console.log("SaveBlob Success");
                    deferred.resolve(true);
                } else {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement("a");
                        if ("download" in link) {
                            // Prepare a blob URL
                            blob = new Blob([data], { type: contentType });
                            url = urlCreator.createObjectURL(blob);
                            link.setAttribute("href", url);

                            // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                            link.setAttribute("download", filename);

                            // Simulate clicking the download link
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            link.dispatchEvent(event);

                            // console.log("Download link Success");
                            deferred.resolve(true);
                        } else {
                            // Prepare a blob URL
                            // Use application/octet-stream when using window.location to force download
                            blob = new Blob([data], { type: octetStreamMime });
                            url = urlCreator.createObjectURL(blob);
                            window.location = url;

                            // console.log("window.location Success");
                            deferred.resolve(true);
                        }
                    } else {
                        // console.log("UrlCreator not supported, falling back to window.open");
                        window.open(downloadUrl, '_blank', '');
                    }
                }

            })
            .error(function (data, status) {
                deferred.reject(decodeUtf8(data));
            });

        return deferred.promise;
    }

    function decodeUtf8(arrayBuffer) {
        var result = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;

        var data = new Uint8Array(arrayBuffer);

        // If we have a BOM skip it
        if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
            i = 3;
        }

        while (i < data.length) {
            c = data[i];

            if (c < 128) {
                result += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                if (i + 1 >= data.length) {
                    throw "UTF-8 Decode failed. Two byte character was truncated.";
                }
                c2 = data[i + 1];
                result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                if (i + 2 >= data.length) {
                    throw "UTF-8 Decode failed. Multi byte character was truncated.";
                }
                c2 = data[i + 1];
                c3 = data[i + 2];
                result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return result;
    }
});