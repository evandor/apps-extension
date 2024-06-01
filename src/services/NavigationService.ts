import {openURL, uid} from "quasar";
import {useNotificationHandler} from "src/core/services/ErrorHandler";
import {ExecutionResult} from "src/core/domain/ExecutionResult";
import _ from "lodash"

const {handleSuccess} = useNotificationHandler()

class NavigationService {

  placeholderPattern = /\${[^}]*}/gm

  async openChromeTab(chromeTab: chrome.tabs.Tab) {
    const window = await chrome.tabs.highlight({windowId: chromeTab.windowId, tabs: chromeTab.index})
    if (typeof window.id === "number") {
      await chrome.windows.update(window.id, {focused: true})
    }
  }

  async openOrCreateTab(
    withUrls: string[],
    matcher: string | undefined = undefined,
    groups: string[] = [],
    forceCurrent: boolean = false,
    forceReload: boolean = false
  ) {
    withUrls.map(u => u.replace(this.placeholderPattern, ""));
    const useWindowIdent = this.getUseWindowIdent(forceCurrent, withUrls)
    console.log(` > opening url(s) ${withUrls} in window: '${useWindowIdent}', groups: '${groups}', mode: '${process.env.MODE}'`)


    if (process.env.MODE === "bex") {
      const queryInfo = {currentWindow: true}

      // getting all tabs from this window
      chrome.tabs.query(queryInfo, (t: chrome.tabs.Tab[]) => {
        const ctx = this
        withUrls.forEach(function (url, i) {
          let found = false;
          // console.log("checking t", _.map(t, t=>t.url))
          t.filter(r => r.url)
            .map(r => {
              // console.log("checking r", r)
              let matchCondition = url === r.url
              if (matchCondition) {
                if (!found) { // highlight only first hit
                  found = true
                  console.debug("found something", r)
                  if (r.active) {
                    const {handleSuccess} = useNotificationHandler()
                    handleSuccess(new ExecutionResult("", "already opened..."))
                  }
                  chrome.tabs.highlight({tabs: r.index});
                  // chrome.windows.update(useWindowId, {focused: true})
                }
              }
            });
          if (!found) {
            console.debug("tab not found, creating new one:", url)
            chrome.tabs.create({
              active: true,
              pinned: false,
              url: url
            }, (tab: chrome.tabs.Tab) => {
              //chrome.windows.update(useWindowId, {focused: true})
            })

          }
        })
      })
    } else {
      openURL(withUrls[0])
    }

  }

  private getUseWindowIdent(forceCurrent: boolean, urls: string[]) {
    return 'current'
  }

  async openSingleTab(url: string): Promise<chrome.tabs.Tab> {
    return await chrome.tabs.create({url: url})
  }

}

export default new NavigationService();

