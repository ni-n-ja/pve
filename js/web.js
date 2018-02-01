'use strict';

window.onload = function () {
    console.log(screen);

    let select = document.querySelector("#select");
    let processing = document.querySelector("#processing");
    let preview = document.querySelector("#preview");
    let addVideos = document.querySelector("#addVideos");
    let selectDone = document.querySelector("#select-done");
    let retry = document.querySelector("#retry");
    let finish = document.querySelector("#finish");

    selectDone.addEventListener('click', (event) => {
        select.style.display = 'none';
        processing.style.display = 'flex';
        generatingAnimetion();
    });

    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('service-worker.js', {
    //             scope: './'
    //         })
    //         .then((registration) => {})
    //         .catch((e) => {
    //             console.error(e);
    //         });
    // }
    document.querySelector('#addButton-inner').addEventListener('click', (e) => {
        let event = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
        });
        document.querySelector('#addVideo').addEventListener('click', (e) => {
            console.log(document.querySelector('#addVideo').files);
        });
        document.querySelector('#addVideo').dispatchEvent(event);
    });
    retry.addEventListener('click', (event) => {
        select.style.display = 'flex';
        preview.style.display = 'none';
        let progressText = document.getElementsByClassName('progress')[0];
        progressText.querySelectorAll('.caption').forEach((e) => {
            e.querySelector('.progress-icon').innerHTML = '';
        });
    });
}

function generatingAnimetion(params) {
    let animationData = [{
        ms: 1000,
        focusText: "アップロード中",
        normalText: "アップロード"
    }, {
        ms: 1000,
        focusText: "音声を解析中",
        normalText: "音声の解析"
    }, {
        ms: 1000,
        focusText: "動画を解析中",
        normalText: "動画の解析"
    }, {
        ms: 1000,
        focusText: "動画を生成中",
        normalText: "動画の生成"
    }];
    let processingEmoji = '<i style="color:greenyellow;" class="fas fa-circle-notch fa-spin"></i>';
    let checkEmoji = '<i style="color:greenyellow;" class="fas fa-check"></i>';
    let bigSuccess = '<i style="color:greenyellow;font-size:50px;" class="fas fa-check-circle"></i>';
    let count = 0;
    let startTime = Date.now();
    let progressText = document.getElementsByClassName('progress')[0];
    progressText.querySelectorAll('.caption')[count].querySelector('.progress-icon').innerHTML = processingEmoji;
    let greenBar = document.getElementsByClassName('bar_front')[0];
    greenBar.style.width = '0%';
    let animationManage = () => {
        if (Date.now() - startTime >= animationData[count].ms) {
            console.log(count);
            greenBar.style.width = '0%';
            progressText.querySelectorAll('.caption')[count].querySelector('.progress-icon').innerHTML = checkEmoji;
            count++;
            if (count == animationData.length) {
                cancelAnimationFrame(timer);
                greenBar.style.width = '100%';
                document.getElementsByClassName('circle')[0].innerHTML = bigSuccess;
                setTimeout(() => {
                    processing.style.display = 'none';
                    select.style.display = 'none';
                    preview.style.display = 'flex';
                }, 3000);
                return;
            }
            progressText.querySelectorAll('.caption')[count].querySelector('.progress-icon').innerHTML = processingEmoji;
            startTime = Date.now();
        }
        greenBar.style.width = (Date.now() - startTime) * 100 / animationData[count].ms + '%';
        requestAnimationFrame(animationManage);
    }
    let timer = requestAnimationFrame(animationManage);
}