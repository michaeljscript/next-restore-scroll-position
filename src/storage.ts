export const getStorage = () => sessionStorage

export const saveScrollPos = (asPath: string, scrollAreaId:null|string) => {
    try {
        let scrollPos = null
        let scrollArea: HTMLElement|null = null

        if (scrollAreaId){
            scrollArea = document.getElementById(scrollAreaId)
        }

        if (scrollArea){
            scrollPos = { x:scrollArea.scrollLeft , y: scrollArea.scrollTop }
        } else {
            scrollPos = { x: window.scrollX, y: window.scrollY }
        }

        if(scrollPos){
            getStorage().setItem(`scrollPos:${asPath}`, JSON.stringify(scrollPos))
        }

    // eslint-disable-next-line no-empty
    } catch (error) {}
}

export const restoreScrollPos = (asPath: string, scrollAreaId:null|string) => {
  try {

    const json = getStorage().getItem(`scrollPos:${asPath}`)
    const scrollPos = json ? JSON.parse(json) : undefined

    let scrollArea: HTMLElement|Window|null  = null
    
    if (scrollAreaId){
        scrollArea = document.getElementById(scrollAreaId)
    }

    if (!scrollArea){
        scrollArea = window
    } 

    if (scrollPos && scrollArea && scrollPos.y) {
        scrollArea.scrollTo(scrollPos.x, scrollPos.y)
    }
    
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export const deleteScrollPos = (asPath: string) => {
  try {
    getStorage().removeItem(`scrollPos:${asPath}`)
    // eslint-disable-next-line no-empty
  } catch (error) {}
}