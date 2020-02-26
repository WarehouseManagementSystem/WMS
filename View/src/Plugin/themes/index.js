// theme url from https://bootswatch.com api 
let themeUrl = 'https://bootswatch.com/api/4.json'
// 默认主题
const defaultTheme = 'Default'
// 当前主题
localStorage.theme = localStorage.theme || defaultTheme

// Get themes api json
let getThemes = () => {
    return fetch(themeUrl).then(res => res.json())
}
// Get themes list and write to sessionStorage，name`s themesList
let getThemesList = async () => { 
    if (!localStorage.themesList) { 
        await getThemes().then(data => localStorage.themesList = JSON.stringify(data.themes))
                .catch(e => console.log('[Vue UI Error][Theme]Themes loaded error: ', e.message))
    }
    return localStorage.themesList
}
// Set theme
// change element link`s href which rel attribute is 'stylesheet' if is exist
// if the element is not exist add it and set it`s href attribute and rel attribute is 'stylesheet'
let setTheme = async (themeName = localStorage.theme) => {
    if (!themeName) return
    if (themeName !== localStorage.theme) localStorage.theme = themeName
    
    let theme
    if (themeName !== defaultTheme) { 
        let themesList = await JSON.parse(await getThemesList())
        theme = themesList.find && themesList.find(e => e.name.toLowerCase() === themeName.toLowerCase())
    }

    let link = Array.from(document.getElementsByTagName('link')).find(e => e.rel === 'stylesheet')
    if (!link) {
        let head = document.getElementsByTagName('head')[0]
        link = document.createElement('link')
        link.rel = "stylesheet"
        head.appendChild(link)
    }

    link.href = themeName === defaultTheme ? '' : theme && theme.cssMin // `bootswatch/dist/${urls.themes[3].name}/bootstrap.min.css`
}

export default {
    install: (Vue) => {
        Vue.prototype.$theme = {
            themeUrl,
            defaultTheme,
            getThemesList,
            setTheme,
        }
    }
}
