/*
 * flickr-gallery-site
 * https://github.com/Pen-Guin/flickr-gallery-site
 *
 * Copyright 2014, KEIO Picnic Club
 * http://keiopicnicclub.jimdo.com/
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

$(function () {
    'use strict';

    var flickr_userid = '128738866@N04';
    //var flickr_userid = '35662970@N08';

    var photosize;
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('android') != -1) {
        photosize = "z";
    }
    else if (userAgent.indexOf('iphone') != -1) {
        photosize = "z";
    } 
    else {
        photosize = "b";
    }

    // Load demo images from flickr:
    searchAll();

    $('#blueimp-gallery').data('useBootstrapModal', false);

    //$('#icon').on('click', searchAll);

    $('#dropdown').on('click', searchAllorPicnic);
    $('#photosize').on('click', changePhotoSize);

    function searchAll() {
        console.log("searchAll");

        $('#links').empty(); // 写真を全て削除

        $.ajax({
            url: 'https://api.flickr.com/services/rest/',
            data: {
                format: 'json',
                method: 'flickr.photos.search',
                api_key: '455acff28c45a1a5fd1e873bb111bbc3',
                user_id: flickr_userid,
                sort: 'date-posted-desc'
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        }).done(function (result) {
            console.log(result);
            var linksContainer = $('#links'),
                baseUrl;
            // Add the demo images as links with thumbnails to the page:
            $.each(result.photos.photo, function (index, photo) {
                baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret;
                $('<a/>')
                    .append($('<img>').prop('src', baseUrl + '_' + photosize + '.jpg'))
                    .prop('href', baseUrl + '_b.jpg')
                    .prop('title', photo.title)
                    .attr('data-gallery', '')
                    .appendTo(linksContainer);
            });
        });
    }

    function searchAllorPicnic(event) {
        console.log("searchAllorPicnic");

        if(event.target.id == "ALL") {
            searchAll();
        }
        else {
            searchPicnic(event);
        }
    }

    function searchPicnic(event) {
        console.log("searchPicnic");

        $('#links').empty(); // 写真を全て削除

        $.ajax({
            url: 'https://api.flickr.com/services/rest/',
            data: {
                format: 'json',
                method: 'flickr.photos.search',
                api_key: '455acff28c45a1a5fd1e873bb111bbc3',
                user_id: flickr_userid,
                sort: 'date-posted-desc',
                //tags: 'test'
                tags: event.target.id // ドロップダウンリストのDOM ID（Flickrのタグ）で検索
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        }).done(function (result) {
            console.log(result);
            var linksContainer = $('#links'),
                baseUrl;
            // Add the demo images as links with thumbnails to the page:
            $.each(result.photos.photo, function (index, photo) {
                baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret;
                $('<a/>')
                    .append($('<img>').prop('src', baseUrl + '_' + photosize + '.jpg'))
                    .prop('href', baseUrl + '_b.jpg')
                    .prop('title', photo.title)
                    .attr('data-gallery', '')
                    .appendTo(linksContainer);
            });
        });
    }

    function changePhotoSize(event) {
        console.log("changePhotoSize");

        console.log(event.target.id);
        if(event.target.id == "sizeL") {
            setPhotoWidth("100%");
        }
        else if(event.target.id == "sizeM") {
            setPhotoWidth("25%");
        }
        else if(event.target.id == "sizeS") {
            setPhotoWidth("10%");
        }
    }

    function setPhotoWidth(width) {
        console.log("setPhotoWidth");

        $('#links img').fadeOut(function() {
            $('#links img').css("width", width).fadeIn();
        });
    }

});
