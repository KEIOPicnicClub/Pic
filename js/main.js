/*
 * Bootstrap Image Gallery JS Demo 3.0.1
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true */
/*global blueimp, $ */

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

    function searchAll() {
        $('#links').empty(); // 写真を全て削除

        $.ajax({
            url: 'https://api.flickr.com/services/rest/',
            data: {
                format: 'json',
                method: 'flickr.photos.search',
                api_key: '/* your flickr api key */',
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
        if(event.target.id == "ALL") {
            searchAll();
        }
        else {
            searchPicnic(event);
        }
    }

    function searchPicnic(event) {
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

});
