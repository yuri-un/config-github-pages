class ConfigFile{
    constructor(){
        this.path = this.getRelPath();
        this.pathValue = '.';
        this.loaded = false;
    }

    async getRelPath(){
        let result = '.';
        const configURL = location.origin+location.pathname + '/config.json';

        let prom = await fetch(configURL)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw ({'msg': response.status});
            }
        })
        .then(data => data)
        .catch(error => {
            console.log('Configuration file not found (' + error.msg + ')! The module sound effects may be disabled! \nCheck the README documentation at https://github.com/Yuri-Un/minesweeper \n');
        });

        return prom;
    }
}

//Vars
let dir = '.'
const confElem = document.querySelector('.config-file');
const libElem = document.querySelector('.lib-json');
const cssfElem = document.querySelector('.css-images');

//Entry point
const configFile = new ConfigFile();
const relPath = async () => {
    const result = await configFile.path;
    confElem.innerText = JSON.stringify(result);
    libElem.innerText = "." + result.libpath + "/data.json";
    cssfElem.innerHTML = "<img src='" + result.csspath + "/qrcode_www.youtube.com.png' />";

    dir = result;
};

relPath();

setTimeout(() => {
    console.log(dir)
}, 500);