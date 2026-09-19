const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktopAPI',{
 getAppInfo:()=>ipcRenderer.invoke('app-info'), saveSettings:x=>ipcRenderer.invoke('save-settings',x),testApi:()=>ipcRenderer.invoke('test-api'),testMarketData:()=>ipcRenderer.invoke('test-market-data'),marketQuotes:x=>ipcRenderer.invoke('market-quotes',x),marketFx:x=>ipcRenderer.invoke('market-fx',x),
 checkUpdates:()=>ipcRenderer.invoke('check-updates'),installUpdate:()=>ipcRenderer.invoke('install-update'),
 schoolAsk:x=>ipcRenderer.invoke('school-ask',x), researchAsk:x=>ipcRenderer.invoke('research-ask',x),researchAgent:x=>ipcRenderer.invoke('research-agent',x),compareAssets:x=>ipcRenderer.invoke('compare-assets',x),identifyAsset:x=>ipcRenderer.invoke('identify-asset',x), planAsk:x=>ipcRenderer.invoke('plan-ask',x),
 diagnostics:()=>ipcRenderer.invoke('diagnostics'),clearLogs:()=>ipcRenderer.invoke('clear-logs'),onUpdateStatus:fn=>ipcRenderer.on('update-status',(_,x)=>fn(x))
});