const { ipcRenderer } = require('electron')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { machineIdSync } = require('node-machine-id')



let suff = './resources/app' //'./'
//

let $;



const host = 'http://39.108.216.184/index.php/api/trik/'


let clock_eio3
let clock_eio4
window.addEventListener('DOMContentLoaded', () => {
    $ = require('jquery')
    let keyOj = require('./data/key.json')
    $('.val_react_code').val(keyOj.key)
    $('.save_react_code').on('click', () => {
        let key = $('.val_react_code').val();
        $.ajax({
            method: 'post',
            url: host + 'set_verify_key',
            data: {
                key: key,
                agent: machineIdSync()
            },
            success: (res) => {
                if (res.success) {
                    fs.writeFile(path.join(suff, '/data/key.json'), JSON.stringify({
                        key: key
                    }), 'utf8', () => {
                        flush()
                    })
                    notify(`success`, `激活完成!`)
                } else {
                    notify(`验证失败`, res.mes)
                }
            },
            error: () => {
                notify(`错误`, `请确认你已经连接互联网`)
            }
        })
    })

    $('#open_to_config_for_1').on('click', (e) => {
        e.preventDefault()
        turnConfigBox('bg_eio3')
    })
    $('#open_to_config_for_2').on('click', (e) => {
        e.preventDefault()
        turnConfigBox('bg_eio4')
    })

    $('.save_btn').on('click', function (e) {
        pass[$(this).attr('pasfunc')]($(this).attr('formid'))
        $('.config_bg').each((_, ele) => {
            $(ele).fadeOut()
        })
    })

    $('#eio3  .trik_running').on('click', () => {

        verify(() => {
            start_eio3()
        })
    })

    $('#eio4  .trik_running').on('click', () => {

        verify(() => {
            start_eio4()
        })
    })


    $('#eio3  .stop_running').on('click', () => {
        stop_eio3()
    })
    $('#eio4  .stop_running').on('click', () => {
        stop_eio4()
    })

    $('.notify_box .nb_ico').on('click', () => {
        $('.notify_box').fadeOut()
    })

    $('.notify_box').fadeOut()



    flush()

    //更新日志

    let log = require('./data/log.json')
    let rowLogHtml = ''
    log.forEach((txt) => {
        rowLogHtml += `<code>${txt}</code>`
    })
    $('.log_box').html(rowLogHtml)


    $('#bg_eio4 .del_posi').click(() => {
        let eio4Conf = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio4.json')))
        eio4Conf.positions = []
        fs.writeFile(path.join(suff, './data/config/eio4.json'), JSON.stringify(eio4Conf), 'utf8', () => {
            flush()
            flushEio4Position()
        })
        notify('清除完成', '脚本id:eio4')
    })
    $('#bg_eio4 .add_posi').click(() => {
        let recClock = 5
        $('#bg_eio4 .tip_beg_record').text(`请将鼠标移动到聊天框位置(5秒后记录)`)
        let recordIntval = setInterval(() => {
            recClock--
            if (recClock == 0) {
                let processRecPosi = spawn(`${suff}/bin/python/python.exe`, [`${suff}/trik/read_position.py`])
                processRecPosi.stdout.on('data', (data) => {
                    let eio4Conf = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio4.json')))
                    eio4Conf.positions.push(data.toString('utf8').trim())
                    fs.writeFile(path.join(suff, './data/config/eio4.json'), JSON.stringify(eio4Conf), 'utf8', () => {
                        flush()
                    })
                    $('#bg_eio4 .tip_beg_record').text(`记录完成`)
                    setTimeout(() => {
                        $('#bg_eio4 .tip_beg_record').text(``)
                        flushEio4Position()
                    }, 1000);
                })

                clearInterval(recordIntval)
                return
            }
            $('#bg_eio4 .tip_beg_record').text(`请将鼠标移动到聊天框位置(${recClock}秒后记录)`)
        }, 1000);
    })
})

function flush() {
    flushEio3()
    flushEio4Position()
}
function flushEio3() {
    let eio3_config = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio3.json')))
    $(`#eio3 input`).val(eio3_config.freq)
    $(`#eio3 textarea`).val(eio3_config.wordList.join('\n'))
}

function flushEio4Position() {
    // return
    let eio4Conf = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio4.json')))

    if (eio4Conf.randomMod) {
        $('#eio4 input[value="1"][type="radio"]').attr('checked', 'true')
        $('#eio4 input[value="0"][type="radio"]').removeAttr('checked')
    } else {
        $('#eio4 input[value="1"][type="radio"]').removeAttr('checked')
        $('#eio4 input[value="0"][type="radio"]').attr('checked', 'true')
    }
    $('#eio4 [name="freq"]').val(eio4Conf.freq)
    $('#eio4 [name="space_time"]').val(eio4Conf.spaceTime)
    let eio3_config = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio3.json')))
    $(`#eio4 textarea`).val(eio3_config.wordList.join('\n'))
    $('#eio4 .window_posi').html('')
    eio4Conf.positions.forEach((v, k) => {
        $('#eio4 .window_posi').append(`<span>[窗口${k + 1}:${v}];</span>`)
    })
}

function verify(cb) {
    let keyFil = JSON.parse(fs.readFileSync(path.join(suff, './data/key.json')))
    $.ajax(
        {
            url: host + 'verify_popbot',
            method: 'post',
            data: {
                agent: machineIdSync(),
                key: keyFil.key
            },
            success: (res) => {
                if (res.success) {
                    cb(true)
                } else {
                    notify(`验证失败`, res.mes)
                }
            },
            error: () => {
                notify(`错误`, `请确认你已经连接互联网`)
            }
        })
}


function start_eio3() {

    clearInterval(clock_eio3)
    // 自动机器人任务开始



    let config = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio3.json')))
    let nowDelc = 0
    if ((!config.freq) || parseInt(config.freq) <= 0) {
        notify(`错误`, `脚本运行频率设置错误`)
    }
    clock_eio3 = setInterval(() => {
        nowDelc++
        if (nowDelc == config.wordList.length) nowDelc = 0
        if (!config.wordList[nowDelc]) return nowDelc++
        let pyProcess = spawn(`${suff}/bin/python/python.exe`, [`${suff}/trik/input.py`, config.wordList[nowDelc].replace(/\r\n/g, "")])
    }, config.freq * 1000)
    notify(`脚本id:{eio3}启动成功!`, `可通过日志监视脚本运行`)
    log('脚本id:{eio3}启动成功!');
    tansStateRuning('eio3', false)
}

function stop_eio3() {
    // 自动机器人任务结束
    clearInterval(clock_eio3)
    notify(`脚本id:{eio3}已停止!`, `请查看脚本运行日志`)
    log('脚本id:{eio3}已停止!');
    tansStateRuning('eio3', true)
}
function stop_eio4() {
    // 自动机器人任务结束
    clearInterval(clock_eio4)
    notify(`脚本id:{eio4}已停止!`, `请查看脚本运行日志`)
    log('脚本id:{eio4}已停止!');
    tansStateRuning('eio4', true)
}

function log(str) {

    let logs = require('./data/log.json')
    if (logs.length > 1000) {
        logs = logs.slice(900, logs.length - 1)
    }
    let logmes = `${getTimeVit()}>${str}`
    logs.push(logmes)
    fs.writeFile(path.join(suff, '/data/log.json'), JSON.stringify(logs), 'utf8', () => {
        flush()
    })
    let code = document.createElement('code')
    code.innerText = logmes
    $('.log_box').append(code)
}

function getTimeVit() {
    let d = new Date()
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}



function tansStateRuning(id, isRun) {
    if (isRun) {
        $(`#${id} .trik_running`).css('display', 'inline-block')
        $(`#${id} .stop_running`).css('display', 'none')
    } else {
        $(`#${id} .trik_running`).css('display', 'none')
        $(`#${id} .stop_running`).css('display', 'inline-block')
    }
}


function turnConfigBox(id) {
    flush()
    let ele = $(`#${id}`)
    if (ele.attr('open') == 1) {
        ele.fadeOut()
        ele.attr('open', 0)
    } else {
        ele.fadeIn()
        ele.attr('open', 1)
    }
}


let pass = {
    saveConfigFileby1: function (id) {
        let pathCon = `./data/config/${id}.json`
        let freq = $(`#${id} input`).val()
        let strBack = $(`#${id} textarea`).val()
        let config = require(pathCon)
        config.freq = freq
        config.wordList = strBack.split('\n')
        fs.writeFile(path.join(suff, `./data/config/${id}.json`), JSON.stringify(config), 'utf8', err => {
            flush()
            if (err) {
                log(err);
                notify('保存失败!', `详情请查看日志!`)
                return
            }

            if (clock_eio3) {
                notify('保存成功,正在重启!', `新配置已经保存到/config/${id}.json`)
                start_eio3()
            } else {
                notify('保存成功', `新配置已经保存到/config/${id}.json`)
            }
        })
    },
    saveConfigFileby2: function (id) {
        //
        let eio4Conf = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio4.json')))
        if (parseInt($(`#${id} [name="random_mod"]:checked`).val())) {
            eio4Conf.randomMod = true
        } else {
            eio4Conf.randomMod = false
        }
        eio4Conf.spaceTime = $(`#${id} [name="space_time"]`).val()
        eio4Conf.freq = $(`#${id} [name="freq"]`).val() || 60
        fs.writeFile(path.join(suff, './data/config/eio4.json'), JSON.stringify(eio4Conf), 'utf8', () => {
            flush()
        })
        let strBack = $(`#${id} textarea`).val()
        let config = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio3.json')))
        config.wordList = strBack.split('\n')
        fs.writeFile(path.join(suff, `./data/config/eio3.json`), JSON.stringify(config), 'utf8', err => {
            flush()
        })
        tansStateRuning('eio4', true)
        notify('保存成功', '多窗口配置已完成')
        stop_eio4()
    }
}

function start_eio4() {
    let config = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio4.json')))

    config.wordList = JSON.parse(fs.readFileSync(path.join(suff, './data/config/eio3.json'))).wordList
    clearInterval(clock_eio4)
    // 自动机器人任务开始

    let nowDelc = 0
    if ((!config.freq) || parseInt(config.freq) <= 0) {
        notify(`错误`, `脚本运行频率设置错误`)
    }
    clock_eio4 = setInterval(() => {

        if (nowDelc >= config.wordList.length) nowDelc = 0
        if (!config.wordList[nowDelc]) return nowDelc++

        config.positions.forEach((v, i) => {
            let olid = setTimeout(() => {
                if (config.randomMod) {
                    nowDelc = RandomNumBoth(0, config.wordList.length - 1)
                }
                let x = parseInt(v.split(',')[0])
                let y = parseInt(v.split(',')[1])
                console.log(i);
                spawn(`${suff}/bin/python/python.exe`, [`${suff}/trik/input_by_position.py`, x, y, config.wordList[nowDelc].replace(/\r\n/g, "")])
            }, i * parseFloat(config.spaceTime||'1.5') * 1000);
        })
        nowDelc++
    }, config.freq * 1000)
    notify(`脚本id:{eio4}启动成功!`, `可通过日志监视脚本运行`)
    log('脚本id:{eio4}启动成功!');
    tansStateRuning('eio4', false)
}

function notify(title, body) {
    $('.notify_box').fadeIn()
    $('.notify_box .nb_body').html(body)
    $('.notify_box .nb_title').html(title)
    setTimeout(() => {
        $('.notify_box').fadeOut()
    }, 3000);
}

function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}